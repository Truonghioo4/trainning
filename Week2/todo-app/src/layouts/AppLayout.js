import {
	ActionList,
	Frame,
	Icon,
	Navigation,
	Text,
	TopBar
} from "@shopify/polaris";
import {
	ClipboardChecklistIcon,
	HomeIcon,
	NotificationIcon,
	SidekickIcon
} from "@shopify/polaris-icons";
import { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TodoContext from "../context/TodoContex";

const AppLayout = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = navigate?.location?.pathname || location.pathname;
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
	const { todos, setTodos } = useContext(TodoContext);

	const toggleIsMobileNavOpen = useCallback(
		() => setIsMobileNavOpen((prev) => !prev),
		[]
	);

	const toggleIsUserMenuOpen = useCallback(
		() => setIsUserMenuOpen((prev) => !prev),
		[]
	);

	const toggleIsSecondaryMenuOpen = useCallback(() => {
		setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen);
	}, []);

	const handleSearchChange = useCallback(async (value) => {
		setSearchValue(value);
		navigate("/todos");
		try {
			const todoList = await fetch(
				`http://localhost:5000/api/todos?search=${value}`
			)
				.then((res) => res.json())
				.then((res) => res.data);
			setTodos(todoList);
		} catch (error) {}
		setIsSearchActive(value.length > 0);
	}, []);

	const handleSearchResultsDismiss = useCallback(() => {
		setIsSearchActive(false);
		setSearchValue("");
	}, []);

	const userMenuMarkup = (
		<TopBar.UserMenu
			actions={[]}
			name="Dinchan Dev"
			detail="BE NodeJS"
			initials="T"
			open={isUserMenuOpen}
			onToggle={toggleIsUserMenuOpen}
		/>
	);

	const searchFieldMarkup = (
		<TopBar.SearchField
			onChange={handleSearchChange}
			value={searchValue}
			placeholder="Search"
			showFocusBorder
		/>
	);

	const notificationMenuMarkup = (
		<TopBar.Menu
			activatorContent={
				<span>
					<Icon source={NotificationIcon} />
					<Text as="span" visuallyHidden>
						Notification Menu
					</Text>
				</span>
			}
			open={isSecondaryMenuOpen}
			onOpen={toggleIsSecondaryMenuOpen}
			onClose={toggleIsSecondaryMenuOpen}
			actions={[
				{
					items: [{ content: "Notification" }]
				}
			]}
		/>
	);
	const sidekickMenuMarkup = (
		<TopBar.Menu
			activatorContent={
				<span>
					<Icon source={SidekickIcon} />
					<Text as="span" visuallyHidden>
						Sidekick menu
					</Text>
				</span>
			}
		/>
	);

	const secondaryMenuMarkup = (
		<div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
			{sidekickMenuMarkup}
			{notificationMenuMarkup}
		</div>
	);

	const topBarMarkup = (
		<TopBar
			showNavigationToggle
			userMenu={userMenuMarkup}
			secondaryMenu={secondaryMenuMarkup}
			searchResultsVisible={isSearchActive}
			searchField={searchFieldMarkup}
			// searchResults={searchResultsMarkup}
			onSearchResultsDismiss={handleSearchResultsDismiss}
			onNavigationToggle={toggleIsMobileNavOpen}
		/>
	);

	const navigationMarkup = (
		<Navigation location="/">
			<Navigation.Section
				items={[
					{
						label: "Dashboard",
						icon: HomeIcon,
						url: "/",
						onClick: () => navigate("/"),
						selected: pathname === "/"
					},
					{
						label: "Todos",
						icon: ClipboardChecklistIcon,
						url: "/todos",
						onClick: () => navigate("/todos"),
						selected: pathname === "/todos"
					}
				]}
			/>
		</Navigation>
	);

	const logo = {
		topBarSource:
			"https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
		width: 86,
		url: "/",
		accessibilityLabel: "Shopify"
	};
	return (
		<div style={{ height: "250px" }}>
			<Frame
				topBar={topBarMarkup}
				navigation={navigationMarkup}
				showMobileNavigation={isMobileNavOpen}
				onNavigationDismiss={toggleIsMobileNavOpen}
				logo={logo}
			>
				{children}
			</Frame>
		</div>
	);
};

AppLayout.prototype = {};
export default AppLayout;
