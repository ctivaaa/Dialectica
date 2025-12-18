import { Routes } from '@angular/router';
import { Inicio } from './components/pages/inicio/inicio';
import { Admin } from './components/pages/admin/admin';
import { LibrosPage } from './components/pages/libros/libros';
import { Login } from './components/pages/login/login';
import { SignUp } from './components/pages/sign-up/sign-up';
import { activateGuard } from './guards/activate-guard';
import { Nosotros } from './components/pages/nosotros/nosotros';
export const routes: Routes = [
    {
        path: "admin",
        component: Admin,
        title: "admin",
        canActivate: [activateGuard]
    },
 
    {
        path: "inicio",
        component: Inicio,
        title: "Inicio"
    },
    {
        path: "libros",
        component: LibrosPage,
        title: "Libros"
    },
    {
        path: "login",
        component: Login,
        title: "Login"
    },
    {
        path: "nosotros",
        component: Nosotros,
        title: "Nosotros"
    },
    {
        path: "signUp",
        component: SignUp,
        title: "Registro"
    },
    {
        path: "",
        redirectTo: "/inicio",
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "/inicio",
        title: "Error 404"
    },
];
