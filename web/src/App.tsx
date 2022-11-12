import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "./lib/api";

interface EmailData {
  userEmail: string
  password: string
  to: string
  subject: string
  text: string
}

const schema = yup.object({
  userEmail: yup.string().email().required(),
  password: yup.string().required(),
  to: yup.string().email().required(),
  subject: yup.string().required(),
  text: yup.string().required(),
}).required();

function App() {
  const { register, handleSubmit, formState:{ errors } } = useForm<EmailData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: EmailData) => {
    try {
      await api.post('/send-email', data)
      alert('Email enviado!')
    } catch(e) {
      alert(e)
    }
  }

  return (
    <main className="h-screen flex items-center justify-center bg-zinc-900">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 bg-zinc-100 gap-4 border-zinc-700 rounded w-96">
        <input {...register("userEmail")} className="p-2 border border-zinc-800 rounded" type="email" placeholder="Email Gmail" />
        <input {...register("password")} className="p-2 border border-zinc-800 rounded" type="password" placeholder="Senha Gmail" />
        <input {...register("to")} className="p-2 border border-zinc-800 rounded" type="email" placeholder="Email para" />
        <input {...register("subject")} className="p-2 border border-zinc-800 rounded" type="text" placeholder="Assunto" />
        <textarea {...register("text")} className="p-2 border border-zinc-800 rounded" name="text" id="text" placeholder="Sua mensagem"></textarea>
        
        <button type="submit" className="bg-red-500 rounded p-2 text-zinc-50 font-bold hover:bg-red-600 transition-colors">Enviar</button>
      </form>
    </main>
  )
}

export default App
