const sectionTitle = [
    '',
    'I need help with my meal and…',
    'My kitchen has...',
    'I need a meal with estimated calorie of...',
    'My daily calorie intake is...',
    'I want to make meals for...',
    'I have diet restrictions or allergic to...',
    "Here's your meal",
];

const allergenItems = [
    {
        id: 'fish',
        label: 'Fish',
    },
    {
        id: 'pork',
        label: 'Pork',
    },
    {
        id: 'beef',
        label: 'Beef',
    },
    {
        id: 'shellfish',
        label: 'Shellfish / Crustaceans',
    },
    {
        id: 'molluscs',
        label: 'Molluscs',
    },
    {
        id: 'eggs',
        label: 'Eggs',
    },
    {
        id: 'gluten',
        label: 'Gluten',
    },
    {
        id: 'treenuts',
        label: 'Tree Nuts',
    },
];

const menuItems = {
    anon: [
        {
            title: "Login",
            href: "/login"
          },
          {
            title: "Generate Meals",
            href: "/"
          }
    ],
    auth: [
        {
            title: "My Meals",
            href: "/dashboard/"
          },
          {
            title: "Generate Meal",
            href: "/"
          },
          {
            title: "Logout",
            href: "/logout"
          }
    ],
}

export { sectionTitle, allergenItems, menuItems };
