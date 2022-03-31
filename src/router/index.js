import { createWebHistory, createRouter } from "vue-router";
import StartPage from "@/StartPage.vue";
import TableDetail from "@/TableDetail.vue";

const routes = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage,
  },
  {
    path: "/table/:id",
    name: "TableDetail",
    component: TableDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;