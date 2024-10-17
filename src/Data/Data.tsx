import images from '@/public/images/Images';

const initialData = [
   {
      id: 0,
      title: 'Luxury Apartment',
      description: 'Description 1',
      url: images.house,
      src: 'https://cdn.prod.website-files.com/642eb1cd0c43434bc3ab7314/6564f0795c3e1cf2e85b5b1f_eg.avif',
      points: [
         {
            type: 'popup',
            position: [498.2310375663341, 16.791770205834336, -21.165189931694698] as [number, number, number],
            data: {
               title: 'Sân vườn',
               description: 'Đây là cửa hàng',
            },
         },
      ],
   },
   {
      id: 1,
      title: 'Residential House',
      description: 'Description 2',
      url: images.outside,
      src: 'https://cdn.prod.website-files.com/642eb1cd0c43434bc3ab7314/6564f0795c3e1cf2e85b5b1f_eg.avif',
      points: [
         {
            type: 'gate',
            position: [498.2310375663341, 16.791770205834336, -21.165189931694698] as [number, number, number],
            data: {
               title: 'house',
               id: 0,
            },
         },
         {
            type: 'gate',
            position: [-498.2310375663341, 16.791770205834336, -21.165189931694698] as [number, number, number],
            data: {
               title: 'snow',
               id: 2,
            },
         },
      ],
   },
   {
      id: 2,
      title: 'Modern Apartment',
      description: 'Description 3',
      url: images.snow,
      src: 'https://cdn.prod.website-files.com/642eb1cd0c43434bc3ab7314/6564f0795c3e1cf2e85b5b1f_eg.avif',
      points: [
         {
            type: 'gate',
            position: [498.2310375663341, 16.791770205834336, -21.165189931694698] as [number, number, number],
            data: {
               title: 'outside',
               id: 1,
            },
         },
      ],
   },
];

export { initialData };
