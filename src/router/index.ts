import {createRouter, createWebHistory} from "vue-router";
import BookingsViewVue from "@/views/BookingsView.vue";
import ClassroomsViewVue from "@/views/ClassroomsView.vue";
import CurriculumViewVue from "@/views/CurriculumView.vue";
import HomeView from "@/views/HomeView.vue";
import ImplementsViewVue from "@/views/ImplementsView.vue";
import LoginViewVue from "@/views/LoginView.vue";
import TeachersViewVue from "@/views/TeachersView.vue";
import UsersViewVue from "@/views/UsersView.vue";

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
		},
		{
			path: "/home",
			name: "home",
			component: HomeView,
			meta: {
				layout: "Dashboard",
			},
		},
		{
			path: "/bookings",
			name: "bookings",
			component: BookingsViewVue,
			meta: {
				layout: "Dashboard",
			},
		},
		{
			path: "/classrooms",
			name: "classrooms",
			component: ClassroomsViewVue,
			meta: {
				layout: "Dashboard",
			},
		},
		{
			path: "/curriculum",
			name: "curriculum",
			component: CurriculumViewVue,
			meta: {
				layout: "Dashboard",
			},
		},
		{
			path: "/implements",
			name: "implements",
			component: ImplementsViewVue,
			meta: {
				layout: "Dashboard",
			},
		},
		{
			path: "/users",
			name: "users",
			component: UsersViewVue,
			meta: {
				layout: "Dashboard",
			},
		},
		{
			path: "/teachers",
			name: "teachers",
			component: TeachersViewVue,
			meta: {
				layout: "Dashboard",
			},
		},
	],
});

export default router;
