import { createBrowserRouter } from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./root";
import ErrorPage from "@/error-page";
import Contact, { loader as contactLoader, action as contactAction } from "./contact";
import EditContact, { action as editAction } from "./edit";
import { action as destroyAction } from "./destory";
import { Index } from "@/layout/index";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Index></Index>,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: "contacts/:contactId",
				element: <Contact />,
				loader: contactLoader,
				action: contactAction,
			},
			{
				path: "contacts/:contactId/edit",
				element: <EditContact />,
				loader: contactLoader,
				action: editAction,
			},
			{
				path: "contacts/:contactId/destroy",
				action: destroyAction,
			},
			{
				path: "dashboard",
				element: <div>dashboard</div>,
			},
		],
	},
]);
