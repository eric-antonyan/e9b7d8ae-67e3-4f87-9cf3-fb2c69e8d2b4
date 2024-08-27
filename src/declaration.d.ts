declare module "*.css" {
    const content: {
        [key]: string
    }

    export default content;
}

declare module "*.jpg" {
    const content: any;

    export default content;
}