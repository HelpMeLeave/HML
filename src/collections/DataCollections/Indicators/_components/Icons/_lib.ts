import {
  BadgeCheck,
  BookOpen,
  Building,
  Church,
  Coins,
  DollarCircle,
  Education,
  Globe,
  Handshake,
  Heart,
  Home,
  Landmark,
  Leaf,
  Megaphone,
  MessageCircle,
  Scale,
  Shield,
  Smile,
  Star,
  Sun,
  Trophy,
  type BoxIcon,
} from '@boxicons-pro/react'

export const BTN_SIZE = 16

// Note: more quick icons still need choosing; custom icon search was removed
export const QUICK_ICONS: Array<{ id: string; label: string; Comp: BoxIcon }> = [
  { id: 'Trophy', label: 'Trophy', Comp: Trophy },
  { id: 'BadgeCheck', label: 'Badge', Comp: BadgeCheck },
  { id: 'BookOpen', label: 'Book', Comp: BookOpen },
  { id: 'Building', label: 'Building', Comp: Building },
  { id: 'Church', label: 'Church', Comp: Church },
  { id: 'Coins', label: 'Coins', Comp: Coins },
  { id: 'DollarCircle', label: 'DollarCircle', Comp: DollarCircle },
  { id: 'Education', label: 'Education', Comp: Education },
  { id: 'Globe', label: 'Globe', Comp: Globe },
  { id: 'Handshake', label: 'Handshake', Comp: Handshake },
  { id: 'Heart', label: 'Heart', Comp: Heart },
  { id: 'Home', label: 'Home', Comp: Home },
  { id: 'Landmark', label: 'Landmark', Comp: Landmark },
  { id: 'Leaf', label: 'Leaf', Comp: Leaf },
  { id: 'Megaphone', label: 'Megaphone', Comp: Megaphone },
  { id: 'MessageCircle', label: 'Message', Comp: MessageCircle },
  { id: 'Scale', label: 'Scale', Comp: Scale },
  { id: 'Shield', label: 'Shield', Comp: Shield },
  { id: 'Smile', label: 'Smile', Comp: Smile },
  { id: 'Star', label: 'Star', Comp: Star },
  { id: 'Sun', label: 'Sun', Comp: Sun },
]

export const SPECIAL_ICONS = [
  { id: 'pride', label: 'Pride Flag' },
  { id: 'trans', label: 'Trans Flag' },
  { id: 'un', label: 'UN' },
  { id: 'blm', label: 'Black Power' },
] as const
