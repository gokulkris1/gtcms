import StoreDashboard from "components/store/StoreDashboard";
import Banner from "views/Banner/Banner";
import BannerEdit from "views/Banner/BannerEdit";
import Branch from "views/Branch/Branch";
import BranchEdit from "views/Branch/BranchEdit";
import Brand from "views/Brand/Brand";
import BrandEdit from "views/Brand/BrandEdit";
import Coupon from "views/Coupon/Coupon";
import CouponEdit from "views/Coupon/CouponEdit";
import Rewards from "views/Rewards/Rewards";
import RewardsEdit from "views/Rewards/RewardsEdit";
import Shopping from "views/Shopping/Shopping";
import ShoppingEdit from "views/Shopping/ShoppingEdit";
import StaticPage from "views/StaticPage/StaticPage";
import StaticPageEdit from "views/StaticPage/StaticPageEdit";
// import Intro from "views/Intro";
import Store from "views/Store/Store";
import StoreEdit from "views/Store/StoreEdit";
import Users from "views/Users/User";
import UserEdit from "views/Users/UserEdit";
import UserManagement from "views/User/User";
import Receipt from "views/Receipt/Receipt";
import Feedback from "views/Feedback/Feedback";
import Survey from "views/Survey/Survey";
import SurveyEdit from "views/Survey/SurveyEdit";
import Advertisement from "views/Advertisement/Advertisement";
import AdvertisementEdit from "views/Advertisement/AdvertisementEdit";
import Notification from "views/Notification/Notification";
import NotificationEdit from "views/Notification/NotificationEdit";
import Dashboard from "views/dashboard/Dashboard";
import Slider from "views/Slider/Slider";
import SliderEdit from "views/Slider/SliderEdit";
import Product from "views/Product/Product";
import ProductEdit from "views/Product/ProductEdit";
import Points from "views/Points/Points";
import PointsEdit from "views/Points/PointsEdit";
import Category from "views/Category/Category";
import CategoryEdit from "views/Category/CategoryEdit";
import UserReceipt from "views/User/UserReceipt";
import EmailTemplate from "views/EmailTemplate/EmailTemplate";

const dashboardRoutes = [
  // { path: "/intro", component: Intro },
  { path: "/dashboard", component: Dashboard },
  { path: "/device", component: Users },
  { path: "/device/add", component: UserEdit },
  { path: "/device/edit/:id", component: UserEdit },
  { path: "/store", component: Store },
  { path: "/store/add", component: StoreEdit },
  { path: "/store/dashboard", component: StoreDashboard },
  { path: "/store/branch", component: Branch },
  { path: "/store/branch/add", component: BranchEdit },
  { path: "/store/branch/edit/:id", component: BranchEdit },
  { path: "/store/device", component: Users },
  { path: "/store/device/add", component: UserEdit },
  { path: "/store/device/edit/:id", component: UserEdit },
  { path: "/store/banner", component: Banner },
  { path: "/store/banner/add", component: BannerEdit },
  { path: "/store/banner/edit", component: BannerEdit },
  { path: "/store/user", component: UserManagement },
  { path: "/store/user/receipt/:id", component: UserReceipt },
  { path: "/store/edit/:id", component: StoreEdit },
  { path: "/branch", component: Branch },
  { path: "/branch/add", component: BranchEdit },
  { path: "/branch/edit/:id", component: BranchEdit },
  { path: "/coupon", component: Coupon },
  { path: "/coupon/add", component: CouponEdit },
  { path: "/coupon/edit/:id", component: CouponEdit },
  { path: "/banner", component: Banner },
  { path: "/banner/add", component: BannerEdit },
  { path: "/banner/edit", component: BannerEdit },
  { path: "/brand", component: Brand },
  { path: "/brand/add", component: BrandEdit },
  { path: "/brand/edit/:id", component: BrandEdit },
  { path: "/shopping", component: Shopping },
  { path: "/shopping/add", component: ShoppingEdit },
  { path: "/shopping/edit/:id", component: ShoppingEdit },
  { path: "/rewards", component: Rewards },
  { path: "/rewards/add", component: RewardsEdit },
  { path: "/rewards/edit/:id", component: RewardsEdit },
  { path: "/user", component: UserManagement },
  { path: "/user/receipt/:id", component: UserReceipt },
  { path: "/receipt", component: Receipt },
  { path: "/store/receipt", component: Receipt },
  { path: "/feedback", component: Feedback },
  { path: "/static-page", component: StaticPage },
  { path: "/static-page/edit/:id", component: StaticPageEdit },
  { path: "/survey", component: Survey },
  { path: "/survey/add", component: SurveyEdit },
  { path: "/survey/edit/:id", component: SurveyEdit },
  { path: "/advertisement", component: Advertisement },
  { path: "/advertisement/add", component: AdvertisementEdit },
  // { path: "/advertisement/edit", component: AdvertisementEdit },
  { path: "/notification", component: Notification },
  { path: "/notification/add", component: NotificationEdit },
  { path: "/notification/edit/:id", component: NotificationEdit },
  { path: "/slider", component: Slider },
  { path: "/slider/add", component: SliderEdit },
  { path: "/slider/edit/:id", component: SliderEdit },
  { path: "/product", component: Product },
  { path: "/product/add", component: ProductEdit },
  { path: "/product/edit/:id", component: ProductEdit },
  { path: "/points", component: Points },
  { path: "/points/edit/:id", component: PointsEdit },
  { path: "/category", component: Category },
  { path: "/category/add", component: CategoryEdit },
  { path: "/category/edit/:id", component: CategoryEdit },
  { path: "/store/email-template", component: EmailTemplate }
];

export default dashboardRoutes;
