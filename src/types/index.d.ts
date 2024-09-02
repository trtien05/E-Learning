type TMenuItems = {
    url: string,
    title: string,
    icon?: React.ReactNode
}

type TActiveLinkProps = {
    url: string,
    children: React.ReactNode
}

type TCreateUserParams = {
    clerkId: string;
    name?: string;
    username: string;
    email_address: string;
    avatar?: string;
}
export { TMenuItems, TActiveLinkProps, TCreateUserParams }