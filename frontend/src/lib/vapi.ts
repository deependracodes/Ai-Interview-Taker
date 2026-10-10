import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;

export function getVapi(): Vapi {
  if (!vapiInstance) {
    const token = import.meta.env.VITE_VAPI_WEB_TOKEN;

    console.log("token",token)
    if (!token) {
      throw new Error("VITE_VAPI_WEB_TOKEN is not set");
    }
    vapiInstance = new Vapi(token);
    console.log(vapiInstance,"intansce")
  }
  return vapiInstance;
}
