export const sidebarData = [
  // {
  //   name: 'sidebar.intro',
  //   routepath: '/Intro',
  //   iconClass: 'fas fa-chalkboard'
  // },
  {
    name: "sidebar.dashboard",
    iconClass: "fas fa-chart-line",
    routepath: "/dashboard"
  },
  {
    name: "sidebar.tablet",
    iconClass: "fas fa-tablet-alt",
    child: [
      {
        listname: "sidebar.store",
        iconClass: "fa fa-store",
        routepath: "/store"
      },
      {
        listname: "sidebar.branch",
        iconClass: "fa fa-store",
        routepath: "/branch"
      },
      {
        listname: "sidebar.users",
        iconClass: "far fa-user",
        routepath: "/device"
      },
      {
        listname: "sidebar.advertisementmain",
        iconClass: "fas fa-images",
        child: [
          {
            listname: "sidebar.banner",
            iconClass: "fas fa-file-image",
            routepath: "/banner"
          },
          {
            listname: "sidebar.advertisement",
            iconClass: "fas fa-ad",
            routepath: "/advertisement"
          }
        ]
      }
    ]
  },
  {
    name: "sidebar.userapp",
    iconClass: "fas fa-users",
    child: [
      {
        listname: "sidebar.coupon",
        iconClass: "fas fa-receipt",
        routepath: "/coupon"
      },
      {
        listname: "sidebar.brand",
        iconClass: "fas fa-ring",
        routepath: "/brand"
      },
      {
        listname: "sidebar.shopping",
        iconClass: "fas fa-shopping-bag",
        routepath: "/shopping"
      },
      {
        listname: "sidebar.product",
        iconClass: "fas fa-box-open",
        routepath: "/product"
      },
      {
        listname: "sidebar.category",
        iconClass: "fas fa-bars",
        routepath: "/category"
      },
      // {
      //   listname: "sidebar.rewards",
      //   iconClass: "fas fa-star",
      //   routepath: "/rewards",
      // },
      {
        listname: "sidebar.points",
        iconClass: "fas fa-coins",
        routepath: "/points"
      },
      {
        listname: "sidebar.user",
        iconClass: "fas fa-user",
        routepath: "/user"
      },
      {
        listname: "sidebar.receipt",
        iconClass: "fas fa-receipt",
        routepath: "/receipt"
      },
      {
        listname: "sidebar.survey",
        iconClass: "fas fa-clipboard-check",
        routepath: "/survey"
      },
      {
        listname: "sidebar.slider",
        iconClass: "fas fa-images",
        routepath: "/slider"
      },
      {
        listname: "sidebar.notification",
        iconClass: "fas fa-bell",
        routepath: "/notification"
      },
      {
        listname: "sidebar.feedback",
        iconClass: "fas fa-comment",
        routepath: "/feedback"
      }
    ]
  },

  {
    name: "sidebar.staticpage",
    iconClass: "fas fa-file",
    routepath: "/static-page"
  }
];

export const storeSidebarData = [
  // { name: "Back", iconClass: "fa fa-store", routepath: "/" },
  {
    name: "sidebar.storeDashboard",
    iconClass: "fas fa-chart-line",
    routepath: "/store/dashboard"
  },
  {
    name: "sidebar.branch",
    iconClass: "fa fa-store",
    routepath: "/store/branch"
  },
  {
    name: "sidebar.users",
    iconClass: "far fa-user",
    routepath: "/store/device"
  },
  {
    name: "sidebar.banner",
    iconClass: "fas fa-ad",
    routepath: "/store/banner"
  },
  {
    name: "sidebar.user",
    iconClass: "fas fa-user",
    routepath: "/store/user"
  },
  {
    name: "sidebar.receipt",
    iconClass: "fas fa-receipt",
    routepath: "/store/receipt"
  },
  {
    name: "sidebar.emailTemplate",
    iconClass: "fas fa-receipt",
    routepath: "/store/email-template"
  }
];

// Comments:::::::

//  If you want one level child then look below example

/*
  {
    name: 'sidebar.forms',
    iconClass: 'fab fa-wpforms',
    child: [
      {
        listname: 'sidebar.regularforms',
        routepath: '/regularform',
        shortname: 'RF'
      }
    ]
  }
*/

//  If you want Second level child then look below example

/*
   {
      name: 'sidebar.pages',
      iconClass: 'fas fa-print',
      child: [
        {
          listname: 'sidebar.authentication',
          iconClass: 'fas fa-user',
          child: [
            {
              listname: 'sidebar.login',
              routepath: '/login',
              shortname: 'L'
            },
          ]
        }
      ]
    }
*/

export const HorizontalSidebarData = [
  // {
  //   name: "sidebar.intro",
  //   routepath: "/Intro",
  //   iconClass: "fas fa-chalkboard",
  // },
  // {
  //   name: "sidebar.users",
  //   iconClass: "far fa-user",
  //   child: [
  //     {
  //       name: "sidebar.lists",
  //       routepath: "/users",
  //     },
  //   ],
  // },
];

// ### For Horizontal sidebar

//     <!-- Basics -->
//         {
//             name: "sidebar.single",
//             iconClass: "fab fa-stripe-s",
//             routepath: "/single"
//         }
//     <!-- One Level -->
//         {
//             name: "sidebar.onelevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     routepath: "/ex",
//                 }
//             ]
//         }
//     <!-- Second level -->
//         {
//             name: "sidebar.secondlevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     iconClass: "fas fa-plus",
//                     child: [
//                         {
//                             name: "sidebar.example1",
//                             routepath: "/ex1",
//                         },
//                         {
//                             name: "sidebar.example2",
//                             routepath: "/ex2",
//                         }
//                     ]
//                 }
//             ]
//         }
