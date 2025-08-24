import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/api";
import { Checkbox } from "@/components/Checkbox";

export default function Login() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("remember") || false
  );
  console.log("rememberMe", rememberMe);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await login(user, email, pass);
      localStorage.setItem("logged", "true");
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("loginData", JSON.stringify({ user, email, pass }));
      navigate("/home");
    } catch (err) {
      setError((err as Error).message || "Credenciais inválidas");
    }
  }

  const saveInfoOnCache = () => {
    if (rememberMe) {
      localStorage.setItem("loginData", JSON.stringify({ user, email, pass }));
    } else {
      localStorage.removeItem("loginData");
    }
  }

  useEffect(() => {
    const cachedData = localStorage.getItem("loginData");
    if (cachedData) {
      const { user, email, pass } = JSON.parse(cachedData);
      setUser(user);
      setEmail(email);
      setPass(pass);
    }
  }
  , []);

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Separator className="my-4" />
      {error && (
        <Alert className="mb-4">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          placeholder="Usuário (CPF/CNPJ)"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onBlur={(e) => {
            if (e.target.value.length < 11 || e.target.value.length > 14) {
              setError("Usuário deve ter entre 11 e 14 caracteres");
            } else {
              setError("");
            }
            saveInfoOnCache();
          }}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(e.target.value)) {
              setError("Email inválido");
            } else {
              setError("");
            }
            saveInfoOnCache();
          }}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onBlur={(e) => {
            if (e.target.value.length < 6) {
              setError("Senha deve ter pelo menos 6 caracteres");
            } else {
              setError("");
            }
            saveInfoOnCache();
          }}
        />
        <Checkbox
          id="remember-me"
          name="Lembrar usuário"
          checked={rememberMe.toString() === "true"}
          onChange={(e) => {
            setRememberMe(e.target.checked);
            if (e.target.checked) {
              localStorage.setItem("remember", "true");
            } else {
              localStorage.removeItem("remember");
            }
          }}
        />
        <Separator className="my-4" />
        <Button type="submit" variant={"secondary"}>
          Entrar
        </Button>
      </form>
    </div>
  );
}
