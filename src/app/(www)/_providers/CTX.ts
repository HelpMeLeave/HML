import { createContext } from 'react'
import type {
  tAdminBarCTX,
  tFilterCTX,
  tNavFetchCTX,
  tPortalCTX,
  tUserCTX,
} from 'www/_providers/_types'

export const PortalCTX = createContext<tPortalCTX>({
  portal: null as unknown as RefObject<HTMLDivElement>,
})

export const NavCTX = createContext<tNavFetchCTX>({
  footerLinks: [],
  topNav: [],
  year: Date.now(),
  banner: undefined,
})

export const FilterCTX = createContext<tFilterCTX>(null as unknown as tFilterCTX)

export const UserCTX = createContext<tUserCTX>({
  user: null,
  setUser: () => {},
})
export const AdminBarCTX = createContext<tAdminBarCTX | null>({
  data: null,
  setData: (_props) => {},
})
