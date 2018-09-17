import React from 'react';
import Loadable from 'react-loadable'


function Loading() {
    return <div>Nahrávání...</div>;
}

const Orders = Loadable({
    loader: () => import('./views/Orders'),
    loading: Loading,
});

const Dashboard = Loadable({
    loader: () => import('./views/Dashboard'),
    loading: Loading,
});

const Statistics = Loadable({
    loader: () => import('./views/Statistics'),
    loading: Loading,
});

const NewOrder = Loadable({
    loader: () => import('./views/Orders/NewOrder'),
    loading: Loading,
});

const Products = Loadable({
    loader: () => import('./views/Products'),
    loading: Loading,
});

const NewProduct = Loadable({
    loader: () => import('./views/Products/NewProduct'),
    loading: Loading,
});

const Users = Loadable({
    loader: () => import('./views/Users'),
    loading: Loading,
});

const NewUser = Loadable({
    loader: () => import('./views/Users/NewUser'),
    loading: Loading,
});

const Settings = Loadable({
    loader: () => import('./views/Settings'),
    loading: Loading,
});

const Info = Loadable({
    loader: () => import('./views/Settings/Info'),
    loading: Loading,
});

const General = Loadable({
    loader: () => import('./views/Settings/General'),
    loading: Loading,
});

const Categories = Loadable({
    loader: () => import('./views/Categories'),
    loading: Loading,
});

const Props = Loadable({
    loader: () => import('./views/Settings/Props'),
    loading: Loading,
});

const Transports = Loadable({
    loader: () => import('./views/Settings/Transports'),
    loading: Loading,
});

const PaymentType = Loadable({
    loader: () => import('./views/Settings/PaymentType'),
    loading: Loading,
});

const StateType = Loadable({
    loader: () => import('./views/Settings/StateType'),
    loading: Loading,
});


const routes = [
    {path: '/', exact: true, name: 'Objednávky', component: Orders},
    {path: '/dashboard', name: 'Přehled', component: Dashboard},
    {path: '/Statistics', exact: true, name: 'Statistiky', component: Statistics},
    {path: '/orders', exact: true, name: 'orders', component: Orders},
    {path: '/orders/new', name: 'Nová Objednávka', component: NewOrder},
    {path: '/orders/:id', name: 'Upravit Objednávku', component: NewOrder},
    {path: '/orders/show/:id', name: 'Náhled Objednávky', component: NewOrder},
    {path: '/products', exact: true, name: 'Produkty', component: Products},
    {path: '/products/new', name: 'Nový Produkt', component: NewProduct},
    {path: '/products/:id', name: 'Upravit Product', component: NewProduct},
    {path: '/products/show/:id', name: 'Náhled Produktu', component: NewProduct},
    {path: '/users', exact: true, name: 'Uživatelé', component: Users},
    {path: '/users/new', name: 'Nový Uživatel', component: NewUser},
    {path: '/users/:id', name: 'Upravit Uživatele', component: NewUser},
    {path: '/users/show/:id', name: 'Náhled Uživatele', component: NewUser},
    {path: '/settings', exact: true, name: 'Nastavení', component: Settings},
    {path: '/settings/info', name: 'Informace', component: Info},
    {path: '/settings/general', name: 'Obecné', component: General},
    {path: '/settings/categories', name: 'Kategorie', component: Categories},
    {path: '/settings/props', name: 'Parametry', component: Props},
    {path: '/settings/transports', name: 'Dopravci', component: Transports},
    {path: '/settings/paymenttypes', name: 'Typy Plateb', component: PaymentType},
    {path: '/settings/statetypes', name: 'Stavy Objednávek', component: StateType},

];

export default routes;
