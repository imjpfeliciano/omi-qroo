interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="flex flex-col gap-4 max-w-screen-lg w-full">{children}</div>
);

export default Container;
