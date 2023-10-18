interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="flex flex-col gap-4 max-w-screen-lg w-full px-4">
    {children}
  </div>
);

export default Container;
