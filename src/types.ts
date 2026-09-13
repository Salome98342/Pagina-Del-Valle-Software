export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  benefits: string[];
  tag: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatarSeed: string;
  skills: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  review: string;
  rating: number;
  resultsMetric: string;
  serviceReceived: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  features: string[];
  metrics: { label: string; value: string }[];
}

export interface VisitRequestForm {
  name: string;
  company: string;
  phone: string;
  email?: string;
  serviceType: string;
  meetingType: 'virtual' | 'presencial';
  date: string;
  time: string;
  projectDetails: string;
}

export interface CalendarEventPayload {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail?: string;
  location?: string;
}
