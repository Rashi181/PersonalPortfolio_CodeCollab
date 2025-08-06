import {
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider,
} from "@tanstack/react-router";
import RootLayout from "./rootlayout";
import Home from "./pages/home";
import Experience from "./pages/experience";
import Projects from "./pages/projects";
import Skills from "./pages/Skills";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

const rootRoute = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFound,
});

const homeRoute = createRoute({
    path: "/",
    getParentRoute: () => rootRoute,
    component: Home,
});
const experienceRoute = createRoute({
    path: "/experience",
    getParentRoute: () => rootRoute,
    component: Experience,
});
const projectsRoute = createRoute({
    path: "/projects",
    getParentRoute: () => rootRoute,
    component: Projects,
});
const skillsRoute = createRoute({
    path: "/Skills",
    getParentRoute: () => rootRoute,
    component: TechStack,
});
const contactRoute = createRoute({
    path: "/contact",
    getParentRoute: () => rootRoute,
    component: Contact,
});

const routeTree = rootRoute.addChildren([
    homeRoute,
    experienceRoute,
    projectsRoute,
    contactRoute,
]);

const router = createRouter({ routeTree });

export default function Router() {
    return <RouterProvider router={router} />;
}
