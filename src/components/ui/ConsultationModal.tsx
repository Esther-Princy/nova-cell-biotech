import { AnimatePresence, m } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { fadeIn, staggerContainer, staggerItem } from '../../animations'
import { useMotionSafe } from '../../animations/useMotionSafe'
import { useBodyScrollLock, useFocusTrap } from '../../hooks/useFocusTrap'
import { cn } from '../../utils/cn'
import Badge from './Badge'
import Button from './Button'

interface ConsultationModalProps {
  open: boolean
  onClose: () => void
  returnFocusRef?: RefObject<HTMLElement | null>
}

interface FormValues {
  fullName: string
  workEmail: string
  company: string
  researchArea: string
  message: string
}

interface FormErrors {
  fullName?: string
  workEmail?: string
  message?: string
}

const EMPTY_FORM: FormValues = {
  fullName: '',
  workEmail: '',
  company: '',
  researchArea: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!values.workEmail.trim()) {
    errors.workEmail = 'Work email is required.'
  } else if (!EMAIL_PATTERN.test(values.workEmail.trim())) {
    errors.workEmail = 'Enter a valid email address.'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.'
  }

  return errors
}

interface FieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium tracking-wide text-text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

const inputStyles = cn(
  'w-full rounded-sm border border-border bg-bg-primary/70 px-4 py-3',
  'text-sm text-text-primary placeholder:text-text-subtle',
  'transition-[border-color,box-shadow] duration-200',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
  'min-h-11',
)

export default function ConsultationModal({
  open,
  onClose,
  returnFocusRef,
}: ConsultationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const { variants } = useMotionSafe()

  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  useBodyScrollLock(open)
  useFocusTrap(modalRef, open)

  const resetState = useCallback(() => {
    setValues(EMPTY_FORM)
    setErrors({})
    setSubmitted(false)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    resetState()
    requestAnimationFrame(() => returnFocusRef?.current?.focus())
  }, [onClose, resetState, returnFocusRef])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  const updateField = (field: keyof FormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const backdropVariants = variants({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  })

  const modalVariants = variants({
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 20,
      transition: { duration: 0.2 },
    },
  })

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <m.div
            aria-hidden="true"
            className="fixed inset-0 cursor-default bg-bg-primary/75 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          />

          <div className="pointer-events-none relative flex min-h-full items-center justify-center p-4 sm:p-6">
            <m.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'gradient-border pointer-events-auto relative w-full max-w-[650px]',
                'max-h-[min(90vh,820px)] overflow-y-auto rounded-sm',
                'border border-border/60 bg-bg-elevated/95 shadow-[0_24px_80px_rgb(0_0_0/0.55)]',
                'backdrop-blur-md',
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-sm bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgb(0_212_170/0.12),transparent_55%)]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm opacity-40"
              >
                <svg
                  viewBox="0 0 650 120"
                  fill="none"
                  className="absolute -right-4 -top-2 h-32 w-full"
                  preserveAspectRatio="xMaxYMin slice"
                >
                  <g stroke="#1e1e2e" strokeWidth="0.5">
                    {[80, 160, 240, 320, 400, 480, 560].map((x) => (
                      <line key={`gv-${x}`} x1={x} y1={0} x2={x} y2={120} />
                    ))}
                    {[30, 60, 90].map((y) => (
                      <line key={`gh-${y}`} x1={0} y1={y} x2={650} y2={y} />
                    ))}
                  </g>
                  <circle cx={580} cy={36} r={3} fill="rgb(0 212 170 / 0.35)" />
                  <circle cx={520} cy={72} r={2} fill="rgb(123 97 255 / 0.35)" />
                </svg>
              </div>

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 font-display text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-text-subtle">
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgb(0_212_170/0.6)]"
                    />
                    Consultation Request / 01
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close consultation form"
                    className={cn(
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-sm',
                      'border border-border bg-bg-surface text-text-muted',
                      'transition-colors duration-200 hover:border-accent-cyan/30 hover:text-text-primary',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                    )}
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>

                {submitted ? (
                  <m.div
                    variants={variants(fadeIn)}
                    initial="hidden"
                    animate="visible"
                    className="mt-8 text-center sm:mt-10"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
                      <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                    </div>

                    <h2
                      id={titleId}
                      className="mt-6 font-display text-2xl font-bold tracking-tight text-text-primary"
                    >
                      Request Received
                    </h2>

                    <p
                      id={descriptionId}
                      className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-muted text-pretty sm:text-base"
                    >
                      Thank you. Your consultation request has been prepared successfully. Our team
                      will follow up with you.
                    </p>

                    <div className="mt-8 flex justify-center">
                      <Button variant="primary" size="lg" onClick={handleClose}>
                        Close
                      </Button>
                    </div>
                  </m.div>
                ) : (
                  <>
                    <div className="mt-6">
                      <Badge variant="default">Partner With Us</Badge>
                    </div>

                    <h2
                      id={titleId}
                      className="mt-5 font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
                    >
                      Schedule a Consultation
                    </h2>

                    <p
                      id={descriptionId}
                      className="mt-3 text-sm leading-relaxed text-text-muted text-pretty sm:text-base"
                    >
                      Tell us a little about your research goals and our team will be in touch.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="mt-8">
                      <m.div
                        variants={variants(staggerContainer)}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-5"
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <m.div variants={variants(staggerItem)}>
                            <Field id="consultation-full-name" label="Full Name" error={errors.fullName}>
                              <input
                                id="consultation-full-name"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                placeholder="Your name"
                                value={values.fullName}
                                onChange={updateField('fullName')}
                                aria-invalid={Boolean(errors.fullName)}
                                aria-describedby={errors.fullName ? 'consultation-full-name-error' : undefined}
                                className={cn(inputStyles, errors.fullName && 'border-red-400/50')}
                              />
                            </Field>
                          </m.div>

                          <m.div variants={variants(staggerItem)}>
                            <Field id="consultation-work-email" label="Work Email" error={errors.workEmail}>
                              <input
                                id="consultation-work-email"
                                name="workEmail"
                                type="email"
                                autoComplete="email"
                                placeholder="you@company.com"
                                value={values.workEmail}
                                onChange={updateField('workEmail')}
                                aria-invalid={Boolean(errors.workEmail)}
                                aria-describedby={errors.workEmail ? 'consultation-work-email-error' : undefined}
                                className={cn(inputStyles, errors.workEmail && 'border-red-400/50')}
                              />
                            </Field>
                          </m.div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <m.div variants={variants(staggerItem)}>
                            <Field id="consultation-company" label="Company / Organization">
                              <input
                                id="consultation-company"
                                name="company"
                                type="text"
                                autoComplete="organization"
                                placeholder="Company or organization"
                                value={values.company}
                                onChange={updateField('company')}
                                className={inputStyles}
                              />
                            </Field>
                          </m.div>

                          <m.div variants={variants(staggerItem)}>
                            <Field id="consultation-research-area" label="Research Area">
                              <input
                                id="consultation-research-area"
                                name="researchArea"
                                type="text"
                                placeholder="e.g. Drug discovery, protein design..."
                                value={values.researchArea}
                                onChange={updateField('researchArea')}
                                className={inputStyles}
                              />
                            </Field>
                          </m.div>
                        </div>

                        <m.div variants={variants(staggerItem)}>
                          <Field id="consultation-message" label="Message" error={errors.message}>
                            <textarea
                              id="consultation-message"
                              name="message"
                              rows={4}
                              placeholder="Tell us about your project or research goals..."
                              value={values.message}
                              onChange={updateField('message')}
                              aria-invalid={Boolean(errors.message)}
                              aria-describedby={errors.message ? 'consultation-message-error' : undefined}
                              className={cn(
                                inputStyles,
                                'min-h-[7.5rem] resize-y',
                                errors.message && 'border-red-400/50',
                              )}
                            />
                          </Field>
                        </m.div>

                        <m.div
                          variants={variants(staggerItem)}
                          className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center"
                        >
                          <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                            Send Request
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="lg"
                            className="w-full sm:w-auto"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                        </m.div>
                      </m.div>
                    </form>
                  </>
                )}
              </div>
            </m.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
