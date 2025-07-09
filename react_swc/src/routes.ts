import { lazy, type JSX } from "react";

const pages = import.meta.glob('./app/**/*.tsx', {eager: false})

type Route = {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
};

const routes: Route[] = Object.keys(pages).map((filePath) => {
    console.log(filePath)
    let routePath = filePath
        .replace('./app', '')           
        .replace(/\/page\.tsx$/, '')  
        .replace(/\.tsx$/, '')          
        .replace(/\[([^\]]+)\]/g, ':$1'); 

    if (routePath === '') routePath = '/';

    return {
        path: routePath,
        component: lazy(pages[filePath] as () => Promise<any>) // Use relative path for dynamic import
    };
});

export default routes