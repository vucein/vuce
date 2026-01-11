"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { z } from "zod";
import config from "@/lib/config";

// --- Types & Schemas ---

type ProjectGoal = "Build from Scratch" | "Scale Infrastructure" | "AI Integration" | "Performance Audit";
type Timeline = "Immediate" | "Next Quarter" | "Strategic Planning";
type EngagementScale = "Standard Build" | "Enterprise Scale" | "Foundational Partnership";
type Origin = "Social" | "Referral" | "Search" | "Other";

// Individual field schemas for real-time validation
const fieldSchemas: Record<string, z.ZodSchema> = {
    fullName: z.string().min(2),
    email: z.string().email(),
    linkedin: z.string().url(),
    github: z.string().url(),
    country: z.string().min(1),
    phone: z.string().min(5),
    projectGoal: z.string().min(1),
    blocker: z.string().min(10),
    timeline: z.string().min(1),
    engagementScale: z.string().min(1),
    origin: z.string().min(1),
};

const stage1Schema = z.object({
    fullName: fieldSchemas.fullName,
    email: fieldSchemas.email,
    linkedin: fieldSchemas.linkedin.optional().or(z.literal("")),
    github: fieldSchemas.github.optional().or(z.literal("")),
    country: fieldSchemas.country,
    phone: fieldSchemas.phone,
});

const stage2Schema = z.object({
    projectGoal: fieldSchemas.projectGoal,
    blocker: fieldSchemas.blocker,
    vision: z.string().optional(),
});

const stage3Schema = z.object({
    timeline: fieldSchemas.timeline,
    engagementScale: fieldSchemas.engagementScale,
    origin: fieldSchemas.origin,
});

// Mobile Step Configuration
const MOBILE_STEPS = [
    { fields: ['fullName'], title: "Identify.", sub: "Let's start with your name." },
    { fields: ['email'], title: "Identify.", sub: "Where can we reach you?" },
    { fields: ['country', 'phone'], title: "Identify.", sub: "Your direct line." },
    { fields: ['linkedin', 'github'], title: "Identify.", sub: "Your digital footprint." },
    { fields: ['projectGoal'], title: "The Blueprint.", sub: "What is the mission?" },
    { fields: ['blocker'], title: "The Blueprint.", sub: "What's standing in your way?" },
    { fields: ['vision'], title: "The Blueprint.", sub: "Add some context." },
    { fields: ['timeline'], title: "Logistics.", sub: "When do we start?" },
    { fields: ['engagementScale'], title: "Logistics.", sub: "How big is this?" },
    { fields: ['origin'], title: "Logistics.", sub: "How did you find us?" },
];

// Comprehensive list of countries (truncated for space, but logic remains)
const COUNTRIES = [
    { name: "Afghanistan", code: "AF", phone: "+93" },
    { name: "Albania", code: "AL", phone: "+355" },
    { name: "Algeria", code: "DZ", phone: "+213" },
    { name: "Andorra", code: "AD", phone: "+376" },
    { name: "Angola", code: "AO", phone: "+244" },
    { name: "Argentina", code: "AR", phone: "+54" },
    { name: "Armenia", code: "AM", phone: "+374" },
    { name: "Australia", code: "AU", phone: "+61" },
    { name: "Austria", code: "AT", phone: "+43" },
    { name: "Azerbaijan", code: "AZ", phone: "+994" },
    { name: "Bahamas", code: "BS", phone: "+1" },
    { name: "Bahrain", code: "BH", phone: "+973" },
    { name: "Bangladesh", code: "BD", phone: "+880" },
    { name: "Barbados", code: "BB", phone: "+1" },
    { name: "Belarus", code: "BY", phone: "+375" },
    { name: "Belgium", code: "BE", phone: "+32" },
    { name: "Belize", code: "BZ", phone: "+501" },
    { name: "Benin", code: "BJ", phone: "+229" },
    { name: "Bhutan", code: "BT", phone: "+975" },
    { name: "Bolivia", code: "BO", phone: "+591" },
    { name: "Bosnia and Herzegovina", code: "BA", phone: "+387" },
    { name: "Botswana", code: "BW", phone: "+267" },
    { name: "Brazil", code: "BR", phone: "+55" },
    { name: "Brunei", code: "BN", phone: "+673" },
    { name: "Bulgaria", code: "BG", phone: "+359" },
    { name: "Burkina Faso", code: "BF", phone: "+226" },
    { name: "Burundi", code: "BI", phone: "+257" },
    { name: "Cambodia", code: "KH", phone: "+855" },
    { name: "Cameroon", code: "CM", phone: "+237" },
    { name: "Canada", code: "CA", phone: "+1" },
    { name: "Cape Verde", code: "CV", phone: "+238" },
    { name: "Central African Republic", code: "CF", phone: "+236" },
    { name: "Chad", code: "TD", phone: "+235" },
    { name: "Chile", code: "CL", phone: "+56" },
    { name: "China", code: "CN", phone: "+86" },
    { name: "Colombia", code: "CO", phone: "+57" },
    { name: "Comoros", code: "KM", phone: "+269" },
    { name: "Congo", code: "CG", phone: "+242" },
    { name: "Costa Rica", code: "CR", phone: "+506" },
    { name: "Croatia", code: "HR", phone: "+385" },
    { name: "Cuba", code: "CU", phone: "+53" },
    { name: "Cyprus", code: "CY", phone: "+357" },
    { name: "Czech Republic", code: "CZ", phone: "+420" },
    { name: "Denmark", code: "DK", phone: "+45" },
    { name: "Djibouti", code: "DJ", phone: "+253" },
    { name: "Dominica", code: "DM", phone: "+1" },
    { name: "Dominican Republic", code: "DO", phone: "+1" },
    { name: "Ecuador", code: "EC", phone: "+593" },
    { name: "Egypt", code: "EG", phone: "+20" },
    { name: "El Salvador", code: "SV", phone: "+503" },
    { name: "Equatorial Guinea", code: "GQ", phone: "+240" },
    { name: "Eritrea", code: "ER", phone: "+291" },
    { name: "Estonia", code: "EE", phone: "+372" },
    { name: "Ethiopia", code: "ET", phone: "+251" },
    { name: "Fiji", code: "FJ", phone: "+679" },
    { name: "Finland", code: "FI", phone: "+358" },
    { name: "France", code: "FR", phone: "+33" },
    { name: "Gabon", code: "GA", phone: "+241" },
    { name: "Gambia", code: "GM", phone: "+220" },
    { name: "Georgia", code: "GE", phone: "+995" },
    { name: "Germany", code: "DE", phone: "+49" },
    { name: "Ghana", code: "GH", phone: "+233" },
    { name: "Greece", code: "GR", phone: "+30" },
    { name: "Grenada", code: "GD", phone: "+1" },
    { name: "Guatemala", code: "GT", phone: "+502" },
    { name: "Guinea", code: "GN", phone: "+224" },
    { name: "Guinea-Bissau", code: "GW", phone: "+245" },
    { name: "Guyana", code: "GY", phone: "+592" },
    { name: "Haiti", code: "HT", phone: "+509" },
    { name: "Honduras", code: "HN", phone: "+504" },
    { name: "Hungary", code: "HU", phone: "+36" },
    { name: "Iceland", code: "IS", phone: "+354" },
    { name: "India", code: "IN", phone: "+91" },
    { name: "Indonesia", code: "ID", phone: "+62" },
    { name: "Iran", code: "IR", phone: "+98" },
    { name: "Iraq", code: "IQ", phone: "+964" },
    { name: "Ireland", code: "IE", phone: "+353" },
    { name: "Israel", code: "IL", phone: "+972" },
    { name: "Italy", code: "IT", phone: "+39" },
    { name: "Ivory Coast", code: "CI", phone: "+225" },
    { name: "Jamaica", code: "JM", phone: "+1" },
    { name: "Japan", code: "JP", phone: "+81" },
    { name: "Jordan", code: "JO", phone: "+962" },
    { name: "Kazakhstan", code: "KZ", phone: "+7" },
    { name: "Kenya", code: "KE", phone: "+254" },
    { name: "Kiribati", code: "KI", phone: "+686" },
    { name: "Kuwait", code: "KW", phone: "+965" },
    { name: "Kyrgyzstan", code: "KG", phone: "+996" },
    { name: "Laos", code: "LA", phone: "+856" },
    { name: "Latvia", code: "LV", phone: "+371" },
    { name: "Lebanon", code: "LB", phone: "+961" },
    { name: "Lesotho", code: "LS", phone: "+266" },
    { name: "Liberia", code: "LR", phone: "+231" },
    { name: "Libya", code: "LY", phone: "+218" },
    { name: "Liechtenstein", code: "LI", phone: "+423" },
    { name: "Lithuania", code: "LT", phone: "+370" },
    { name: "Luxembourg", code: "LU", phone: "+352" },
    { name: "Macedonia", code: "MK", phone: "+389" },
    { name: "Madagascar", code: "MG", phone: "+261" },
    { name: "Malawi", code: "MW", phone: "+265" },
    { name: "Malaysia", code: "MY", phone: "+60" },
    { name: "Maldives", code: "MV", phone: "+960" },
    { name: "Mali", code: "ML", phone: "+223" },
    { name: "Malta", code: "MT", phone: "+356" },
    { name: "Marshall Islands", code: "MH", phone: "+692" },
    { name: "Mauritania", code: "MR", phone: "+222" },
    { name: "Mauritius", code: "MU", phone: "+230" },
    { name: "Mexico", code: "MX", phone: "+52" },
    { name: "Micronesia", code: "FM", phone: "+691" },
    { name: "Moldova", code: "MD", phone: "+373" },
    { name: "Monaco", code: "MC", phone: "+377" },
    { name: "Mongolia", code: "MN", phone: "+976" },
    { name: "Montenegro", code: "ME", phone: "+382" },
    { name: "Morocco", code: "MA", phone: "+212" },
    { name: "Mozambique", code: "MZ", phone: "+258" },
    { name: "Myanmar", code: "MM", phone: "+95" },
    { name: "Namibia", code: "NA", phone: "+264" },
    { name: "Nauru", code: "NR", phone: "+674" },
    { name: "Nepal", code: "NP", phone: "+977" },
    { name: "Netherlands", code: "NL", phone: "+31" },
    { name: "New Zealand", code: "NZ", phone: "+64" },
    { name: "Nicaragua", code: "NI", phone: "+505" },
    { name: "Niger", code: "NE", phone: "+227" },
    { name: "Nigeria", code: "NG", phone: "+234" },
    { name: "North Korea", code: "KP", phone: "+850" },
    { name: "Norway", code: "NO", phone: "+47" },
    { name: "Oman", code: "OM", phone: "+968" },
    { name: "Pakistan", code: "PK", phone: "+92" },
    { name: "Palau", code: "PW", phone: "+680" },
    { name: "Panama", code: "PA", phone: "+507" },
    { name: "Papua New Guinea", code: "PG", phone: "+675" },
    { name: "Paraguay", code: "PY", phone: "+595" },
    { name: "Peru", code: "PE", phone: "+51" },
    { name: "Philippines", code: "PH", phone: "+63" },
    { name: "Poland", code: "PL", phone: "+48" },
    { name: "Portugal", code: "PT", phone: "+351" },
    { name: "Qatar", code: "QA", phone: "+974" },
    { name: "Romania", code: "RO", phone: "+40" },
    { name: "Russia", code: "RU", phone: "+7" },
    { name: "Rwanda", code: "RW", phone: "+250" },
    { name: "Saint Kitts and Nevis", code: "KN", phone: "+1" },
    { name: "Saint Lucia", code: "LC", phone: "+1" },
    { name: "Saint Vincent and the Grenadines", code: "VC", phone: "+1" },
    { name: "Samoa", code: "WS", phone: "+685" },
    { name: "San Marino", code: "SM", phone: "+378" },
    { name: "Sao Tome and Principe", code: "ST", phone: "+239" },
    { name: "Saudi Arabia", code: "SA", phone: "+966" },
    { name: "Senegal", code: "SN", phone: "+221" },
    { name: "Serbia", code: "RS", phone: "+381" },
    { name: "Seychelles", code: "SC", phone: "+248" },
    { name: "Sierra Leone", code: "SL", phone: "+232" },
    { name: "Singapore", code: "SG", phone: "+65" },
    { name: "Slovakia", code: "SK", phone: "+421" },
    { name: "Slovenia", code: "SI", phone: "+386" },
    { name: "Solomon Islands", code: "SB", phone: "+677" },
    { name: "Somalia", code: "SO", phone: "+252" },
    { name: "South Africa", code: "ZA", phone: "+27" },
    { name: "South Korea", code: "KR", phone: "+82" },
    { name: "South Sudan", code: "SS", phone: "+211" },
    { name: "Spain", code: "ES", phone: "+34" },
    { name: "Sri Lanka", code: "LK", phone: "+94" },
    { name: "Sudan", code: "SD", phone: "+249" },
    { name: "Suriname", code: "SR", phone: "+597" },
    { name: "Swaziland", code: "SZ", phone: "+268" },
    { name: "Sweden", code: "SE", phone: "+46" },
    { name: "Switzerland", code: "CH", phone: "+41" },
    { name: "Syria", code: "SY", phone: "+963" },
    { name: "Taiwan", code: "TW", phone: "+886" },
    { name: "Tajikistan", code: "TJ", phone: "+992" },
    { name: "Tanzania", code: "TZ", phone: "+255" },
    { name: "Thailand", code: "TH", phone: "+66" },
    { name: "Timor-Leste", code: "TL", phone: "+670" },
    { name: "Togo", code: "TG", phone: "+228" },
    { name: "Tonga", code: "TO", phone: "+676" },
    { name: "Trinidad and Tobago", code: "TT", phone: "+1" },
    { name: "Tunisia", code: "TN", phone: "+216" },
    { name: "Turkey", code: "TR", phone: "+90" },
    { name: "Turkmenistan", code: "TM", phone: "+993" },
    { name: "Tuvalu", code: "TV", phone: "+688" },
    { name: "Uganda", code: "UG", phone: "+256" },
    { name: "Ukraine", code: "UA", phone: "+380" },
    { name: "United Arab Emirates", code: "AE", phone: "+971" },
    { name: "United Kingdom", code: "GB", phone: "+44" },
    { name: "United States", code: "US", phone: "+1" },
    { name: "Uruguay", code: "UY", phone: "+598" },
    { name: "Uzbekistan", code: "UZ", phone: "+998" },
    { name: "Vanuatu", code: "VU", phone: "+678" },
    { name: "Vatican City", code: "VA", phone: "+379" },
    { name: "Venezuela", code: "VE", phone: "+58" },
    { name: "Vietnam", code: "VN", phone: "+84" },
    { name: "Yemen", code: "YE", phone: "+967" },
    { name: "Zambia", code: "ZM", phone: "+260" },
    { name: "Zimbabwe", code: "ZW", phone: "+263" },
];

// --- Sub-components ---

const CustomDropdown = ({
    options,
    value,
    onChange,
    placeholder,
    hasError = false,
    isValid = false,
    shaking = false,
}: {
    options: any[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    hasError?: boolean;
    isValid?: boolean;
    shaking?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getDisplayValue = () => {
        if (!value) return null;
        const selected = options.find(o => o.code === value || o === value);
        return typeof selected === 'object' ? selected.name : selected;
    };

    return (
        <motion.div
            className="relative"
            ref={dropdownRef}
            animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-transparent border-b py-2 md:py-4 text-sm md:text-xl font-sans text-left flex items-center justify-between focus:outline-none transition-all duration-500
                ${hasError ? "border-red-500/50" : isValid ? "border-white shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)]" : isOpen ? "border-white" : "border-white/10 hover:border-white/30"}
                `}
            >
                <span className={value ? "text-white" : "text-gray-700 font-light"}>
                    {getDisplayValue() || placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto"
                    >
                        {options.map((option, idx) => {
                            const optValue = typeof option === 'string' ? option : option.code;
                            const optName = typeof option === 'string' ? option : option.name;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        onChange(optValue);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-white transition-colors duration-200 border-b border-white/5 last:border-0 font-sans"
                                >
                                    {optName}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Main Engine ---

export default function VuceLeadEngine({ className = "" }: { className?: string }) {
    const [step, setStep] = useState(1);
    const [mobileStep, setMobileStep] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [validFields, setValidFields] = useState<Set<string>>(new Set());
    const [shakingField, setShakingField] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        linkedin: "",
        github: "",
        country: "",
        phonePrefix: "",
        phone: "",
        projectGoal: "" as ProjectGoal | "",
        blocker: "",
        vision: "",
        timeline: "" as Timeline | "",
        engagementScale: "" as EngagementScale | "",
        origin: "" as Origin | "",
    });

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-Geolocation
    useEffect(() => {
        const controller = new AbortController();
        const fetchGeo = async () => {
            try {
                const res = await fetch(config.api.ipapi, { signal: controller.signal });
                if (!res.ok) throw new Error("Geo service unavailable");
                const data = await res.json();
                if (data.country_code) {
                    const found = COUNTRIES.find((c) => c.code === data.country_code);
                    if (found) {
                        setFormData((prev) => ({
                            ...prev,
                            country: found.code,
                            phonePrefix: found.phone,
                        }));
                    }
                }
            } catch (err) {
                // Ignore abort errors, silently fail for others (common with ad-blockers)
                if (err instanceof Error && err.name !== "AbortError") {
                    // In production, log to error tracking service if needed
                    if (process.env.NODE_ENV === 'development') {
                        console.error("Geo-detection skipped (likely privacy blocker or offline):", err.message);
                    }
                }
            }
        };

        fetchGeo();
        return () => controller.abort();
    }, []);

    // Validation Logic
    const validateField = (name: string, value: any) => {
        const schema = fieldSchemas[name];
        if (!schema) return true;

        // Special case for optional fields
        if ((name === 'linkedin' || name === 'github') && !value) {
            setValidFields(prev => {
                const updated = new Set(prev);
                updated.delete(name);
                return updated;
            });
            return true;
        }

        const result = schema.safeParse(value);
        if (result.success) {
            setValidFields(prev => new Set(prev).add(name));
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
            return true;
        } else {
            setValidFields(prev => {
                const updated = new Set(prev);
                updated.delete(name);
                return updated;
            });
            return false;
        }
    };

    const validateMobileStep = (index: number): boolean => {
        const fields = MOBILE_STEPS[index].fields;
        let allValid = true;

        fields.forEach(field => {
            const isValid = validateField(field, formData[field as keyof typeof formData]);
            if (!isValid && field !== 'github' && field !== 'linkedin') allValid = false; // Socials can be optional/empty based on user logic, but validateField handles basic regex. Re-check logic: validateField updates validation state.

            // Explicit required checks for non-optional fields
            if (field !== 'github' && field !== 'linkedin' && field !== 'vision') { // vision/context optional?
                if (!formData[field as keyof typeof formData]) allValid = false;
            }
        });

        if (!allValid) {
            // Trigger Shake
            const firstField = fields[0];
            setShakingField(firstField);
            setTimeout(() => setShakingField(null), 500);
            return false;
        }
        return true;
    };

    const validateStep = (currentStep: number) => {
        let result;
        if (currentStep === 1) result = stage1Schema.safeParse(formData);
        else if (currentStep === 2) result = stage2Schema.safeParse(formData);
        else if (currentStep === 3) result = stage3Schema.safeParse(formData);

        if (result && !result.success) {
            const fieldErrors: Record<string, string> = {};
            const firstErrorField = result.error.issues[0]?.path[0]?.toString();

            (result.error.issues ?? []).forEach((err) => {
                if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
            });

            // Trigger Shake on the first error field
            if (firstErrorField) {
                setShakingField(firstErrorField);
                setTimeout(() => setShakingField(null), 500);
            }

            setErrors(fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSelect = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleCountrySelect = (countryCode: string) => {
        const country = COUNTRIES.find(c => c.code === countryCode);
        if (country) {
            setFormData(prev => ({ ...prev, country: country.code, phonePrefix: country.phone }));
            validateField("country", country.code);
        }
    };

    const handleNext = () => {
        if (isMobile) {
            if (validateMobileStep(mobileStep)) {
                if (mobileStep < MOBILE_STEPS.length - 1) {
                    setMobileStep(prev => prev + 1);
                } else {
                    setStep(4); // Success state
                }
            }
        } else {
            if (validateStep(step)) {
                setStep((prev) => Math.min(prev + 1, 4));
            }
        }
    };

    const handleBack = () => {
        if (isMobile) {
            setMobileStep(prev => Math.max(prev - 1, 0));
        } else {
            setStep((prev) => Math.max(prev - 1, 1));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If not on final step, just move to next step
        const isFinalStep = isMobile
            ? mobileStep === MOBILE_STEPS.length - 1
            : step === 3;

        if (!isFinalStep) {
            handleNext();
            return;
        }

        // Validate final step
        if (!validateStep(isMobile ? 3 : step)) {
            return;
        }

        // Submit to API
        try {
            setErrors({});
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Success - move to success state
            if (isMobile) {
                setStep(4); // Success state
            } else {
                setStep(4); // Success state
            }
        } catch (error) {
            // Show submission error
            const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
            setErrors({
                ...errors,
                submit: errorMessage,
            });
            // Trigger shake animation
            setShakingField('submit');
            setTimeout(() => setShakingField(null), 500);
        }
    };

    // Styling Helpers
    const getInputClasses = (fieldName: string) =>
        `w-full bg-transparent border-b py-2 md:py-4 text-sm md:text-xl font-sans text-white focus:outline-none focus:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] transition-all duration-700 ease-out placeholder:text-gray-700
    ${errors[fieldName] ? "border-red-500/50" : validFields.has(fieldName) ? "border-white shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)]" : "border-white/10"}`;

    const labelClasses = "block text-[10px] text-zinc-500 mb-1 font-sans font-semibold uppercase tracking-[0.2em] opacity-80";

    const pillClasses = (isSelected: boolean) => `
    px-4 py-2.5 md:px-6 md:py-3 rounded-full border text-[10px] md:text-sm font-sans underline-offset-4 transition-all duration-500 cursor-pointer flex items-center justify-center
    ${isSelected
            ? "bg-white text-black border-white font-bold shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)] scale-[1.03] translate-y-[-2px]"
            : "bg-transparent text-gray-400 border-white/10 hover:border-white/40 hover:text-white hover:translate-y-[-1px] active:scale-[0.98]"}
  `;

    const progressPercentage = isMobile
        ? ((mobileStep) / (MOBILE_STEPS.length - 1)) * 100
        : step === 4 ? 100 : ((step - 1) / 3) * 100;

    // Ghost Text Placeholders
    const blueprintPlaceholder = useMemo(() => {
        switch (formData.projectGoal) {
            case "AI Integration": return "Describe your current data stack and model requirements...";
            case "Build from Scratch": return "What is the core problem this product solves for your users?";
            case "Scale Infrastructure": return "Detail your current bottleneck and target throughput...";
            case "Performance Audit": return "Which metrics are mission-critical for this optimization?";
            default: return "Describe the vision or the friction points you need us to resolve...";
        }
    }, [formData.projectGoal]);

    // Renders a specific field for mobile
    const renderMobileField = (field: string) => {
        switch (field) {
            case 'fullName': return (
                <div key="fullName">
                    <label className={labelClasses}>Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={getInputClasses("fullName")} placeholder="John Doe" autoFocus />
                </div>
            );
            case 'email': return (
                <div key="email">
                    <label className={labelClasses}>Professional Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={getInputClasses("email")} placeholder="john@company.com" autoFocus />
                </div>
            );
            case 'country': return (
                /* Grouped with phone below */
                null
            );
            case 'phone': return (
                <div key="phone">
                    <label className={labelClasses}>Phone Number</label>
                    <div className="flex flex-col gap-4">
                        <CustomDropdown options={COUNTRIES} value={formData.country} onChange={handleCountrySelect} placeholder="Select Country" hasError={!!errors.country} isValid={validFields.has("country")} shaking={shakingField === "country"} />
                        <div className="flex gap-2">
                            <input type="text" name="phonePrefix" autoComplete="tel-country-code" value={formData.phonePrefix} onChange={handleInputChange} className="py-2 md:py-4 text-sm md:text-xl font-sans text-white bg-transparent border-b border-white/10 w-12 md:w-20 text-center focus:outline-none focus:border-white transition-all duration-300" />
                            <div className="flex-1 w-full">
                                <input type="tel" name="phone" autoComplete="tel-national" value={formData.phone} onChange={handleInputChange} className={getInputClasses("phone")} placeholder="555 000 0000" />
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 'linkedin': return (
                /* Grouped with Github */
                null
            );
            case 'github': return (
                <div key="socials" className="space-y-6">
                    <div>
                        <label className={labelClasses}>LinkedIn</label>
                        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className={getInputClasses("linkedin")} placeholder="linkedin.com/in/..." autoFocus />
                    </div>
                    <div>
                        <label className={labelClasses}>GitHub (Optional)</label>
                        <input type="text" name="github" value={formData.github} onChange={handleInputChange} className={getInputClasses("github")} placeholder="github.com/..." />
                    </div>
                </div>
            );
            case 'projectGoal': return (
                <div key="projectGoal">
                    <label className={labelClasses}>Project Goal</label>
                    <div className="flex flex-col gap-2 mt-3">
                        {["Build from Scratch", "Scale Infrastructure", "AI Integration", "Performance Audit"].map((goal) => (
                            <button key={goal} onClick={() => handleSelect("projectGoal", goal)} className={pillClasses(formData.projectGoal === goal)}>{goal}</button>
                        ))}
                    </div>
                </div>
            );
            case 'blocker': return (
                <div key="blocker">
                    <label className={labelClasses}>The Primary Friction</label>
                    <input type="text" name="blocker" value={formData.blocker} onChange={handleInputChange} className={getInputClasses("blocker")} placeholder="What is holding you back?" autoFocus />
                </div>
            );
            case 'vision': return (
                <div key="vision">
                    <label className={labelClasses}>Context</label>
                    <textarea name="vision" value={formData.vision} onChange={handleInputChange} rows={4} className={`${getInputClasses("vision")} resize-none`} placeholder={blueprintPlaceholder} autoFocus />
                </div>
            );
            case 'timeline': return (
                <div key="timeline">
                    <label className={labelClasses}>Timeline</label>
                    <div className="flex flex-col gap-2 mt-3">
                        {["Immediate", "Next Quarter", "Strategic Planning"].map((time) => (
                            <button key={time} onClick={() => handleSelect("timeline", time)} className={pillClasses(formData.timeline === time)}>{time}</button>
                        ))}
                    </div>
                </div>
            );
            case 'engagementScale': return (
                <div key="engagementScale">
                    <label className={labelClasses}>Engagement Scale</label>
                    <div className="flex flex-col gap-2 mt-3">
                        {["Standard Build", "Enterprise Scale", "Foundational Partnership"].map((scale) => (
                            <button key={scale} onClick={() => handleSelect("engagementScale", scale)} className={pillClasses(formData.engagementScale === scale)}>{scale}</button>
                        ))}
                    </div>
                </div>
            );
            case 'origin': return (
                <div key="origin">
                    <label className={labelClasses}>How did you find us?</label>
                    <CustomDropdown options={["Social Media", "Referral", "Search Engine", "Other"]} value={formData.origin} onChange={(val) => handleSelect("origin", val)} placeholder="Select Origin..." hasError={!!errors.origin} isValid={validFields.has("origin")} shaking={shakingField === "origin"} />
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className={`relative w-full max-w-4xl mx-auto bg-black rounded-[2rem] border border-white/10 overflow-hidden p-6 md:p-20 shadow-2xl ${className}`}>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-800">
                <motion.div
                    className="h-full bg-gradient-to-r from-gray-400 to-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black pointer-events-none" />

            <div className="relative z-10 w-full min-h-[500px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {/* Success State (Identical for Mobile & Desktop) */}
                    {step === 4 ? (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 py-10 md:py-20 relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-white/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none z-0"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <h2 className="relative z-10 text-4xl md:text-7xl font-sans font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-white/50 -tracking-[0.05em] drop-shadow-2xl">
                                Received.
                            </h2>
                            <p className="relative z-10 text-gray-400 text-sm md:text-xl font-light max-w-[280px] md:max-w-md mx-auto leading-relaxed">
                                Our engineering leads are reviewing your trajectory now.
                            </p>
                        </motion.div>
                    ) : isMobile ? (
                        // --- MOBILE VIEW ---
                        <motion.div
                            key={`mobile-step-${mobileStep}`}
                            initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="space-y-2 text-left">
                                <h2 className="text-3xl font-sans font-extrabold tracking-tighter text-white -tracking-[0.05em]">
                                    {MOBILE_STEPS[mobileStep].title}
                                </h2>
                                <p className="text-gray-500 text-sm font-light">
                                    {MOBILE_STEPS[mobileStep].sub}
                                </p>
                            </div>

                            <motion.div animate={shakingField ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }} className="min-h-[200px]">
                                {MOBILE_STEPS[mobileStep].fields.map(field => renderMobileField(field))}
                            </motion.div>

                            {errors.submit && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm font-sans"
                                >
                                    {errors.submit}
                                </motion.div>
                            )}
                            <div className="flex justify-between items-center pt-8">
                                <button
                                    onClick={handleBack}
                                    className={`text-gray-500 text-sm hover:text-white transition-colors uppercase tracking-widest ${mobileStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={mobileStep === MOBILE_STEPS.length - 1 ? handleSubmit : handleNext}
                                    className="group flex items-center gap-3 text-white text-base font-bold tracking-tight hover:opacity-80 transition-opacity"
                                >
                                    {mobileStep === MOBILE_STEPS.length - 1 ? "FINISH PROJECT" : "NEXT STEP"}
                                    <span className="p-2.5 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        // --- DESKTOP VIEW ---
                        <>
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-4 text-left">
                                        <h2 className="text-3xl md:text-6xl font-sans font-extrabold tracking-tighter text-white -tracking-[0.05em]">
                                            Identify.
                                        </h2>
                                        <p className="text-gray-500 text-sm md:text-xl font-light">
                                            Tell us who you are. We&apos;ll handle the rest.
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                                            <motion.div
                                                animate={shakingField === "fullName" ? { x: [-10, 10, -10, 10, 0] } : {}}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <label className={labelClasses}>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    className={getInputClasses("fullName")}
                                                    placeholder="John Doe"
                                                />
                                            </motion.div>
                                            <motion.div
                                                animate={shakingField === "email" ? { x: [-10, 10, -10, 10, 0] } : {}}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <label className={labelClasses}>Professional Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={getInputClasses("email")}
                                                    placeholder="john@company.com"
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                                            <div>
                                                <label className={labelClasses}>Country</label>
                                                <CustomDropdown
                                                    options={COUNTRIES}
                                                    value={formData.country}
                                                    onChange={handleCountrySelect}
                                                    placeholder="Select Country"
                                                    hasError={!!errors.country}
                                                    isValid={validFields.has("country")}
                                                    shaking={shakingField === "country"}
                                                />
                                            </div>
                                            <motion.div
                                                className="flex-1"
                                                animate={shakingField === "phone" ? { x: [-10, 10, -10, 10, 0] } : {}}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <label className={labelClasses}>Phone Number</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        name="phonePrefix"
                                                        autoComplete="tel-country-code"
                                                        value={formData.phonePrefix}
                                                        onChange={handleInputChange}
                                                        className="py-2 md:py-4 text-sm md:text-xl font-sans text-white bg-transparent border-b border-white/10 w-12 md:w-20 text-center focus:outline-none focus:border-white transition-all duration-300"
                                                    />
                                                    <div className="flex-1 w-full">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            autoComplete="tel-national"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            className={getInputClasses("phone")}
                                                            placeholder="555 000 0000"
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                                            <motion.div animate={shakingField === "linkedin" ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                                                <label className={labelClasses}>LinkedIn</label>
                                                <input
                                                    type="text"
                                                    name="linkedin"
                                                    value={formData.linkedin}
                                                    onChange={handleInputChange}
                                                    className={getInputClasses("linkedin")}
                                                    placeholder="linkedin.com/in/..."
                                                />
                                            </motion.div>
                                            <motion.div animate={shakingField === "github" ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                                                <label className={labelClasses}>GitHub (Optional)</label>
                                                <input
                                                    type="text"
                                                    name="github"
                                                    value={formData.github}
                                                    onChange={handleInputChange}
                                                    className={getInputClasses("github")}
                                                    placeholder="github.com/..."
                                                />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-8">
                                        <button
                                            onClick={handleNext}
                                            className="group flex items-center gap-3 text-white text-base font-bold tracking-tight hover:opacity-80 transition-opacity"
                                        >
                                            NEXT STEP
                                            <span className="p-2.5 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-4 text-left">
                                        <h2 className="text-3xl md:text-6xl font-sans font-extrabold tracking-tighter text-white -tracking-[0.05em]">
                                            The Blueprint.
                                        </h2>
                                        <p className="text-gray-500 text-sm md:text-xl font-light">
                                            Define the trajectory.
                                        </p>
                                    </div>

                                    <div className="space-y-10">
                                        <motion.div animate={shakingField === "projectGoal" ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                                            <label className={labelClasses}>Project Goal</label>
                                            <div className="flex flex-wrap gap-2 md:gap-3 mt-3">
                                                {["Build from Scratch", "Scale Infrastructure", "AI Integration", "Performance Audit"].map((goal) => (
                                                    <button
                                                        key={goal}
                                                        onClick={() => handleSelect("projectGoal", goal)}
                                                        className={pillClasses(formData.projectGoal === goal)}
                                                    >
                                                        {goal}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>

                                        <motion.div animate={shakingField === "blocker" ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                                            <label className={labelClasses}>The Primary Friction</label>
                                            <input
                                                type="text"
                                                name="blocker"
                                                value={formData.blocker}
                                                onChange={handleInputChange}
                                                className={getInputClasses("blocker")}
                                                placeholder="What is the #1 thing holding you back right now?"
                                            />
                                        </motion.div>

                                        <div>
                                            <label className={labelClasses}>Context</label>
                                            <textarea
                                                name="vision"
                                                value={formData.vision}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className={`${getInputClasses("vision")} resize-none`}
                                                placeholder={blueprintPlaceholder}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-8">
                                        <button
                                            onClick={handleBack}
                                            className="text-gray-500 text-sm hover:text-white transition-colors uppercase tracking-widest"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="group flex items-center gap-3 text-white text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
                                        >
                                            NEXT STEP
                                            <span className="p-2 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                                                <ArrowRight className="w-5 h-5" />
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-4 text-left">
                                        <h2 className="text-3xl md:text-6xl font-sans font-extrabold tracking-tighter text-white -tracking-[0.05em]">
                                            Logistics.
                                        </h2>
                                        <p className="text-gray-500 text-sm md:text-xl font-light">
                                            Let&apos;s talk execution.
                                        </p>
                                    </div>

                                    <div className="space-y-10">
                                        <motion.div animate={shakingField === "timeline" ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                                            <label className={labelClasses}>Timeline</label>
                                            <div className="flex flex-wrap gap-2 md:gap-3 mt-3">
                                                {["Immediate", "Next Quarter", "Strategic Planning"].map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => handleSelect("timeline", time)}
                                                        className={pillClasses(formData.timeline === time)}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>

                                        <motion.div animate={shakingField === "engagementScale" ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                                            <label className={labelClasses}>Engagement Scale</label>
                                            <div className="flex flex-wrap gap-2 md:gap-3 mt-3">
                                                {["Standard Build", "Enterprise Scale", "Foundational Partnership"].map((scale) => (
                                                    <button
                                                        key={scale}
                                                        onClick={() => handleSelect("engagementScale", scale)}
                                                        className={pillClasses(formData.engagementScale === scale)}
                                                    >
                                                        {scale}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>

                                        <div className="max-w-md">
                                            <label className={labelClasses}>How did you find us?</label>
                                            <CustomDropdown
                                                options={["Social Media", "Referral", "Search Engine", "Other"]}
                                                value={formData.origin}
                                                onChange={(val) => handleSelect("origin", val)}
                                                placeholder="Select Origin..."
                                                hasError={!!errors.origin}
                                                isValid={validFields.has("origin")}
                                                shaking={shakingField === "origin"}
                                            />
                                        </div>
                                    </div>

                                    {errors.submit && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-sm font-sans"
                                        >
                                            {errors.submit}
                                        </motion.div>
                                    )}
                                    <div className="flex justify-between items-center pt-8">
                                        <button
                                            onClick={handleBack}
                                            className="text-gray-500 text-sm hover:text-white transition-colors uppercase tracking-widest"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="relative bg-white text-black px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-lg tracking-tight hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden group"
                                        >
                                            {/* Shimmer Light Ray */}
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                                            Initialize //
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Global Keyframes for Shimmer */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-150%); }
                    100% { transform: translateX(150%); }
                }
            `}</style>
        </div>
    );
}
