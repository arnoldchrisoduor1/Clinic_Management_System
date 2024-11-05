import bg from "../../../public/images/background-3.jpg";
import AuthForm from "@/components/AuthForm";

const page = () => {
  return (
    <>
    <div
        className="min-h-screen w-full bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `url(${bg.src})`
        }}
        id="home"
      >
        <AuthForm />
      </div>
    </>
  )
}

export default page