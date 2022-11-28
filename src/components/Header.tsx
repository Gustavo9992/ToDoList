import logoImg from '../assets/Logo.svg'; 

export function Header() {
  return (
    <header className="h-[200px] bg-gray-700 items-center justify-center flex">
      <img src={logoImg} alt="Logo Image" />
    </header>
  );
}