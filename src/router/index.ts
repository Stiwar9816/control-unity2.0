import {createRouter, createWebHistory} from "vue-router";
import BookingsViewVue from "@/views/BookingsView.vue";
import ClassroomsViewVue from "@/views/ClassroomsView.vue";
import CurriculumViewVue from "@/views/CurriculumView.vue";
import HomeView from "@/views/HomeView.vue";
import ImplementsViewVue from "@/views/ImplementsView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import TeachersViewVue from "@/views/TeachersView.vue";
import UsersViewVue from "@/views/UsersView.vue";
import { requiredAuth, useGuard } from "@/middlewares/auth";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "login",
			component: LoginViewVue,
			meta: {
				layout: "Default",
			},
			beforeEnter: useGuard
		},
		{
			path: "/home",
			name: "home",
			component: HomeView,
			meta: {
				layout: "Dashboard",
				requireAuth: true
			},
			beforeEnter: requiredAuth
		},
		{
			path: "/bookings",
			name: "bookings",
			component: BookingsViewVue,
			meta: {
				layout: "Dashboard",
				requireAuth: true
			},
			beforeEnter: requiredAuth
		},
		{
			path: "/classrooms",
			name: "classrooms",
			component: ClassroomsViewVue,
			meta: {
				layout: "Dashboard",
				requireAuth: true
			},
			beforeEnter: requiredAuth
		},
		{
			path: "/curriculum",
			name: "curriculum",
			component: CurriculumViewVue,
			meta: {
				layout: "Dashboard",
				requireAuth: true
			},
			beforeEnter: requiredAuth
		},
		{
			path: "/implements",
			name: "implements",
			component: ImplementsViewVue,
			meta: {
				layout: "Dashboard",
				requireAuth: true
			},
			beforeEnter: requiredAuth
		},
		{
			path: "/users",
			name: "users",
			component: UsersViewVue,
			meta: {
				layout: "Dashboard",
				requireAuth: true
			},
			beforeEnter: requiredAuth
		},
		{
			path: "/teachers",
			name: "teachers",
			component: TeachersViewVue,
			meta: {
				layout: "Dashboard",
				requireAuth: true
			},
			beforeEnter: requiredAuth
		},
	],
});

export default router;
