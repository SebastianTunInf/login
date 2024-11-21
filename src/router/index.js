import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: () => import("../components/Home-h.vue")},
        {path: "/register", component: () => import("../components/Register-r.vue")},
        {path: "/sign-in", component: () => import("../components/Signin-s.vue")},
        {path: "/feed", component: () => import("../components/Feed-f.vue"),
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            (error) => {
                removeListener();
                reject(error);
            }
        );
    });
};

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        try {
            const user = await getCurrentUser();
            if (user) {
                next();
            } else {
                alert("Access denied");
                next("/sign-in");
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
            next("/sign-in")
        }
    } else {
        next();
    }
});

export default router;