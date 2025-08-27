const routes = {
    main: "/",
    home: "/home",

    // Auth
    login: "/login",
    register: "/register",
    verifyEmail: "/verify-email",
    forgotPassword: "/forgot-password",
    changePassword: "/change-password",

    // Main
    projects: "/projects",
    projectDetail: "/project/:projectId",
    donations: "/donations",
    createProject: "/create-project",
    profile: "/profile",
    notFound: "*",
};

export default routes;