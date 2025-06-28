import { FaGithub } from "react-icons/fa";

export type NavBarProps = {
  titleLink?: string;
  githubLink?: string;
}

export default function Navbar({ titleLink = ".", githubLink = "#" } : NavBarProps) {
  return (
    <nav className="bg-gray-700 text-gray-100 bg-gradient-to-b px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <a title="TodoList" href={ titleLink } className="hover:underline">
          TodoList
        </a>
      </div>
      <div>
        <a title="GitHub" href={ githubLink } className="hover:underline">
          <FaGithub size={ 25 } />
        </a>
      </div>
    </nav>
  )
}