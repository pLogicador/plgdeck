interface LabelProps {
  name: string;
}

export function Label({ name }: LabelProps) {
  return (
    <div className="flex-grow sm:flex-grow-0 py-1 px-3 bg-gray-900 text-white text-center hover:font-bold duration-300">
      {name}
    </div>
  );
}
