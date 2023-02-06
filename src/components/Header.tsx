import Logo from '../assets/Logo.svg';

export function Header() {
  return (
    <header className="h-52 bg-gray-700 flex items-center justify-center">
      <img src={Logo} alt="" />
    </header>
  )
}