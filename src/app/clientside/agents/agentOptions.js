import { FiUsers, FiDatabase, FiUserPlus, FiRefreshCw, FiGlobe, FiAperture, FiMessageCircle, FiMail } from 'react-icons/fi'

export const AGENT_OPTIONS = [
  {
    id: 'brand',
    name: 'Brand Agent',
    description: 'Salesforce CRM bridge for brand preferences',
    tagline: 'Query user affinity data with natural language and sync it back securely.',
    accent: {
      gradient: 'linear(135deg, #171b29 0%, #8f8570 100%)',
      softBg: 'rgba(23, 27, 41, 0.08)',
      softText: '#171b29',
      tagBg: 'rgba(23, 27, 41, 0.08)',
      tagColor: '#171b29',
    },
    icon: FiUsers,
  },
  {
    id: 'hushh',
    name: 'Hushh Agent',
    description: 'Supabase data query agent',
    tagline: 'Ask natural language questions to retrieve Supabase-driven intelligence.',
    accent: {
      gradient: 'linear(135deg, #171b29 0%, #b7a789 100%)',
      softBg: 'rgba(143, 133, 112, 0.14)',
      softText: '#171b29',
      tagBg: 'rgba(143, 133, 112, 0.14)',
      tagColor: '#171b29',
    },
    icon: FiDatabase,
  },
  {
    id: 'supabase-profile-creation-agent',
    name: 'Supabase Profile Creation Agent',
    description: 'Supabase profile onboarding',
    tagline: 'Create rich Supabase user profiles with conversational prompts.',
    accent: {
      gradient: 'linear(135deg, #8f8570 0%, #b7a789 100%)',
      softBg: 'rgba(183, 167, 137, 0.18)',
      softText: '#171b29',
      tagBg: 'rgba(183, 167, 137, 0.18)',
      tagColor: '#171b29',
    },
    icon: FiUserPlus,
  },
  {
    id: 'hushh-profile-update',
    name: 'Hushh Profile Update Agent',
    description: 'Supabase profile maintenance',
    tagline: 'Update Supabase records accurately with a single natural language request.',
    accent: {
      gradient: 'linear(135deg, #171b29 0%, #8f8570 60%, #b7a789 100%)',
      softBg: 'rgba(23, 27, 41, 0.06)',
      softText: '#171b29',
      tagBg: 'rgba(23, 27, 41, 0.06)',
      tagColor: '#171b29',
    },
    icon: FiRefreshCw,
  },
  {
    id: 'public',
    name: 'Public Data Agent',
    description: 'OpenAI data enrichment',
    tagline: 'Blend public web knowledge with your brand data in seconds.',
    accent: {
      gradient: 'linear(135deg, #171b29 0%, #8f8570 100%)',
      softBg: 'rgba(143, 133, 112, 0.14)',
      softText: '#171b29',
      tagBg: 'rgba(143, 133, 112, 0.14)',
      tagColor: '#171b29',
    },
    icon: FiGlobe,
  },
  {
    id: 'gemini',
    name: 'Gemini Agent',
    description: 'Gemini AI data enrichment',
    tagline: 'Cross-check answers with Google Gemini for balanced coverage.',
    accent: {
      gradient: 'linear(135deg, #171b29 0%, #b7a789 100%)',
      softBg: 'rgba(183, 167, 137, 0.18)',
      softText: '#171b29',
      tagBg: 'rgba(183, 167, 137, 0.18)',
      tagColor: '#171b29',
    },
    icon: FiAperture,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp CRM Agent',
    description: 'Send WhatsApp messages',
    tagline: 'Trigger templated WhatsApp engagements without leaving the console.',
    accent: {
      gradient: 'linear(135deg, #8f8570 0%, #b7a789 100%)',
      softBg: 'rgba(248, 246, 241, 0.9)',
      softText: '#171b29',
      tagBg: 'rgba(248, 246, 241, 0.9)',
      tagColor: '#171b29',
    },
    icon: FiMessageCircle,
  },
  {
    id: 'email',
    name: 'Email Integration Agent',
    description: 'Send transactional emails',
    tagline: 'Deliver branded transactional emails with pre-approved templates.',
    accent: {
      gradient: 'linear(135deg, #171b29 0%, #8f8570 100%)',
      softBg: 'rgba(23, 27, 41, 0.08)',
      softText: '#171b29',
      tagBg: 'rgba(23, 27, 41, 0.08)',
      tagColor: '#171b29',
    },
    icon: FiMail,
  },
]

export const CHAT_ENABLED_AGENT_IDS = ['brand', 'hushh', 'supabase-profile-creation-agent', 'hushh-profile-update', 'public', 'gemini']

export function getAgentOptionById(id) {
  return AGENT_OPTIONS.find((agent) => agent.id === id)
}
