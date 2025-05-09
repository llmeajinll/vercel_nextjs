interface PropsType {
    content: string;
    read: boolean;
    setRead: React.Dispatch<React.SetStateAction<boolean>>;
}

export const updateTodo = async ({ content, read, setRead }: PropsType) => {
    console.log(content);
    setRead(!read);
};
