import { ListElement } from "src/models/listElement";

// map of list elements
let el = {
  title: new ListElement("title", "Title", "text"),
  category: new ListElement("categoryName", "Category", "select"),
  startDate: new ListElement("startDate", "Start Date", "date"),
  endDate: new ListElement("endDate", "End Date", "date"),
  price: new ListElement("price", "Price", "number"),
  amount: new ListElement("amount", "Amount", "text"),
  firstName: new ListElement("firstName", "First Name", "text"),
  lastName: new ListElement("lastName", "Last Name", "text"),
  email: new ListElement("email", "Email", "email"),
  name: new ListElement("name", "Name", "text"),
  password: new ListElement("password", "Password", "password"),
  confirmPassword: new ListElement(
    "confirmPassword",
    "Confirm Password",
    "password"
  ),
  image: new ListElement("image", "Image URL", "text")
};
// map of lists
export default {
  customerDashCouponSections: [
    el.title,
    el.category,
    el.startDate,
    el.endDate,
    el.price
  ],
  couponsViewRightSection: [el.startDate, el.endDate, el.amount, el.price],
  adminDashCustomerSections: [el.firstName, el.lastName, el.email],
  adminDashCompanySections: [el.name, el.email, new ListElement()],
  addCompanySections: [el.name, el.email, el.password],
  viewCompanySections: [el.name, el.email],
  adminDashUpdateCustomer: [
    el.firstName,
    el.lastName,
    el.email,
    el.password,
    el.confirmPassword
  ],
  companyDashCoupons: [
    el.title,
    el.category,
    el.startDate,
    el.endDate,
    el.amount,
    el.price
  ],
  editCouponSections: [el.startDate, el.endDate, el.amount, el.price],
  editCompanySections: [el.email, el.password, el.confirmPassword],
  addCouponSections: [
    el.title,
    el.startDate,
    el.endDate,
    el.amount,
    el.price,
    el.image
  ]
};
