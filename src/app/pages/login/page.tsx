import { LoginForm } from "@/components/login/page";

export default function LoginPage() {
  return (
      <section className="bg-ct-blue-600 min-h-screen h-full">
        <div className="h-screen flex items-center">
          <div className="md:w-2/5 md:px-10 w-full flex justify-center">
            <div className=" md:w-4/6 w-3/4">
              <LoginForm />
            </div>
          </div>
          <div className="hero h-full opacity-60 w-3/5 md:flex hidden" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1478428036186-d435e23988ea?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}></div>
        </div>
      </section>
  );
}
