import { GalleryVerticalEnd, GalleryVerticalEndIcon } from "lucide-react"


import { SignupForm } from "@/Component/SignupForm"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
      <BlurFade delay={0.50} inView>

      
      
        
        <SignupForm />
        </BlurFade>
      </div>
    </div>
  )
}
