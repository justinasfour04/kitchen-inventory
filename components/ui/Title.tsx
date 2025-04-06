type TitleProps = {
  title: string;
  className?: string;
};

export function Title({ title, className }: TitleProps) {
  return (
    <span class={`text-xl font-bold text-blue-600 ${className}`}>
      {title}
    </span>
  );
}
