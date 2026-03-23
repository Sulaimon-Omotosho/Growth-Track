import z from 'zod'

export const Uchema = z.object({
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})

export const ChurchTeamSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  pastorId: z.string().min(1, { message: 'Pastor needed for this team' }),
  description: z
    .string()
    .trim()
    .max(30, { message: 'Short description not more than 30!' })
    .optional(),
})

export const DepartmentSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this team' }),
  churchTeamId: z.string().min(1, { message: 'Pastor needed for this team' }),
  email: z.email().optional(),
  description: z
    .string()
    .trim()
    .max(30, { message: 'Short description not more than 30!' })
    .optional(),
})

export const DistrictSchema = z.object({
  name: z.string().min(2, { message: 'Name of District needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this District' }),
})

export const CommunitySchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this community' }),
  districtId: z
    .string()
    .min(1, { message: 'District needed for this Community' }),
})

export const ZoneSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'Pastor needed for this zone' }),
  communityId: z.string().min(1, { message: 'Community needed for this Zone' }),
})

export const CellSchema = z.object({
  name: z.string().min(2, { message: 'Name of Team needed!' }),
  leaderId: z.string().min(1, { message: 'A cell leader is needed' }),
  zoneId: z.string().min(1, { message: 'Zone needed for this Cell' }),
  communityId: z.string().min(1, { message: 'Community needed for this Cell' }),
})
