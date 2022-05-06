export interface ColumnItem {
  label: string;
  href: string;
}

export interface Column {
  title: string;
  items: ColumnItem[];
}

export const FOOTER_LINKS: Readonly<Record<string, Column[]>> = {
  developers: [
    {
      title: 'Explore',
      items: [
        {
          label: 'NEAR Official Documentation',
          href: 'https://docs.near.org/',
        },
        {
          label: 'NEAR Official Wiki',
          href: 'https://wiki.near.org/',
        },
        {
          label: 'NEAR Protocol Specification',
          href: 'https://nomicon.io/',
        },
        {
          label: 'Code Examples',
          href: 'https://examples.near.org/',
        },
        {
          label: 'Explore NEAR Protocol APIs',
          href: 'http://bit.ly/near-apis',
        },
      ],
    },
    {
      title: 'Learn',
      items: [
        {
          label: 'NEAR Certified Developer Course',
          href: 'https://www.near.university/courses/near-certified-developer',
        },
        {
          label: 'NEAR Academy',
          href: 'https://near.academy/',
        },
        {
          label: 'NEAR for Senior Developers',
          href: 'https://hackmd.io/@nearly-learning/near-201',
        },
        {
          label: 'NEAR 101',
          href: 'http://bit.ly/near-101',
        },
        {
          label: 'NEAR 102',
          href: 'http://bit.ly/near-102',
        },
        {
          label: 'Write your first smart contract',
          href: 'https://github.com/near-examples/workshop--exploring-assemblyscript-contracts/tree/master/assembly/A.sample-projects/01.greeting',
        },
      ],
    },
    {
      title: 'Stay Connected',
      items: [
        {
          label: 'Discord',
          href: 'https://discord.gg/k4pxafjMWA',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/NEARedu',
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/near.university/?hl=en',
        },
        {
          label: 'YouTube',
          href: 'https://www.youtube.com/c/NEARProtocol',
        },
        {
          label: 'NEAR Education Official Website',
          href: 'https://www.near.university/',
        },
      ],
    },
  ],
  entrepreneurs: [
    {
      title: 'Explore',
      items: [
        {
          label: 'NEAR Official Documentation',
          href: 'https://docs.near.org/',
        },
        {
          label: 'NEAR Official Wiki',
          href: 'https://wiki.near.org/',
        },
        {
          label: 'Case studies',
          href: 'https://near.org/case-studies/',
        },
      ],
    },
    {
      title: 'Learn',
      items: [
        {
          label: 'NEAR And Far',
          href: 'https://nearandfar.io/',
        },
        {
          label: 'NEAR Certified Analyst',
          href: 'https://www.near.university/courses/near-certified-analyst',
        },
        {
          label: 'NEAR Certified Entrepreneurs',
          href: 'https://www.near.university/courses/near-certified-entrepreneur',
        },
      ],
    },
    {
      title: 'Stay Connected',
      items: [
        {
          label: 'Discord',
          href: 'https://discord.gg/k4pxafjMWA',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/NEARedu',
        },
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/near.university/?hl=en',
        },
        {
          label: 'YouTube',
          href: 'https://www.youtube.com/c/NEARProtocol',
        },
        {
          label: 'NEAR Education Official Website',
          href: 'https://www.near.university/',
        },
      ],
    },
  ],
};
