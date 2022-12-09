import { createBrowserRouter } from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./root";
import ErrorPage from "@/error-page";
import Contact, { loader as contactLoader, action as contactAction } from "./contact";
import EditContact, { action as editAction } from "./edit";
import { action as destroyAction } from "./destory";
import { Index as Layout } from "@/layout";
import Dashboard from "@/views/Dashboard";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: "contacts/:contactId",
				element: <Contact />,
				loader: contactLoader,
				action: contactAction
			},
			{
				path: "contacts/:contactId/edit",
				element: <EditContact />,
				loader: contactLoader,
				action: editAction
			},
			{
				path: "contacts/:contactId/destroy",
				action: destroyAction
			},
			{
				path: "dashboard",
				element: <Dashboard></Dashboard>
			}
		]
	}
]);
