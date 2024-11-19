import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export const AUTH_PROVIDERS = [
  {
    id: "google",
    icon: FcGoogle,
  },
  {
    id: "github",
    icon: FaGithub,
  },
] as const;
