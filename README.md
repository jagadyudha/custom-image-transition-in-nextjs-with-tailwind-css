## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [How Tailwind CSS Transitions Work](#how-tailwind-css-transitions-work)
4. [Understanding next/image onLoadingComplete callback](#understanding-nextimage-onloadingcomplete-callback)
5. [Create Custom Images Components](#create-custom-images-components)
6. [Apply a Blurred Effect to Images](#apply-a-blurred-effect-to-images)
7. [Create a Rick and Morty Character List With a Custom Image](#create-a-rick-and-morty-character-list-with-a-custom-image)
8. [Conclusion](#conclusion)

## Introduction

One of the most important aspects of a website is its images. Images can now become more interactive with the use of CSS transitions. So, in this tutorial, we'll learn how to make images more interactive using the Tailwind CSS.

Tailwind CSS is a utility-first CSS framework packed with classes. Tailwind CSS does not come with components, unlike other CSS frameworks such as Bootstrap or Chakra UI. Tailwind CSS, on the other hand, works by giving you a set of classes. With these classes, you can quickly create your own designs.

<img
  alt='Meme about tailwind css'
  src='https://res.cloudinary.com/dlpb6j88q/image/upload/v1652328849/jagad.dev/posts/custom-image-transition-in-nextjs-with-tailwind-css/Meme_a7vr7s.jpg'
  width='577'
  height='430'
/>

## Getting Started

If you don't already have one, begin by creating a new Next.js project. Using the Create Next App is the most usual method.

```bash
$ npx create-next-app my-project
$ cd my-project
```

After the project is created, we will move to the tailwind installation.

```bash
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

Add the paths to all of your template files in `tailwind.config.js` file.

```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add the @tailwind directives to `./styles/globals.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

After all we can start running project with:

```bash
$ yarn dev

# or

$ npm run dev

```

## How Tailwind CSS Transitions Work

For example, we can make a button with a hover transition that changes the color of its background.

```jsx
<button className="rounded-full bg-teal-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-indigo-500">
  Hello Universe!
</button>
```

<img
  alt='How tailwind css transitions work'
  src='https://res.cloudinary.com/dlpb6j88q/image/upload/v1652327445/jagad.dev/posts/custom-image-transition-in-nextjs-with-tailwind-css/How_Tailwind_CSS_Transitions_Work_bzg7zq.gif'
  width='829'
  height='335'
/>

it can be seen that with the `transition` class we can change the background color from `bg-teal-600` to `bg-indigo-500` with a duration of 300ms `duration-300`.

The transition stuff, which includes transition properties, transition duration, transition timing function, transition delay, and animation, can be found in the Tailwind CSS documentation. Here are all of the explanations for that:

- [Transition Property - Tailwind CSS](https://tailwindcss.com/docs/transition-property)
- [Transition Duration - Tailwind CSS](https://tailwindcss.com/docs/transition-duration)
- [Transition Timing Function - Tailwind CSS](https://tailwindcss.com/docs/transition-timing-function)
- [Transition Delay - Tailwind CSS](https://tailwindcss.com/docs/transition-delay)
- [Animation - Tailwind CSS](https://tailwindcss.com/docs/animation)

## Understanding next/image `onLoadingComplete` callback

onLoadingComplete is a callback function that is invoked once the image is completely loaded and the placeholder has been removed. This means that we can add a transition before the image is fully loaded.

To see how the `onLoadingComplete` callback works, we must create a state that contains the boolean `false`.

```javascript
const [isReady, setIsReady] = useState(false);
```

Next, we create a function onLoadCallback which will change the state of isReady to true.

```javascript
const onLoadCallback = () => {
  setIsReady(true);
};
```

After that, we can call the `onLoadCallback` function in the `onLoadingComplete` props, which will trigger the event parameter which contains the loaded img.

```javascript
<NextImage
  objectFit='cover'
  src={}
  width={}
  height={}
  onLoadingComplete={onLoadCallback} //this is called the callback function
/>
```

## Create Custom Images Components

Now that we know how to use the `onLoadingComplete` callback, we can create custom image components by creating a components folder and putting the `image.js` file inside it.

```bash
├── README.md
├── components # This is the folder where we will create our custom images components
│   └── image.js
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── _app.js
│   ├── index.js
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── styles
│   ├── Home.module.css
│   └── globals.css
└── tailwind.config.js
```

Then, in the `image.js` file, add the following code:

```javascript
import React, { useState } from "react";
import NextImage from "next/image";

const Image = ({ src, ...props }) => {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  return (
    <NextImage
      objectFit="cover"
      src={src}
      {...props}
      onLoadingComplete={onLoadCallback}
      layout="responsive"
    />
  );
};

export default Image;
```

Actually, the code above is the same code (full version) as the code we have learned in the [Understanding next/image onLoadingComplete callback](#understanding-nextimage-onloadingcomplete-callback) section.

## Apply a Blurred Effect to Images

We use the blur effect to apply an effect to custom images that we created before. We can do this by adding the blur class with `blur-2xl` to the image when `isReady` is `false` and remove it when `isReady` is `true` with `blur-0`.

To make transition more interactive, we can add scale class with `scale-120` to the image when `isReady` is `false` and `scale-100` when `isReady` is `true`.

We also add the `transition` and `duration-1000` class to the image to apply the transition effect.

```javascript
<NextImage
  objectFit="cover"
  src={src}
  className={`bg-gray-400 transition duration-1000 ${
    isReady ? "scale-100 bg-gray-400 blur-0" : "scale-120 blur-2xl"
  }`}
  {...props}
  onLoadingComplete={onLoadCallback}
  layout="responsive"
/>
```

After That, we can import images components that we created before and use them in all images.

```javascript
//this is the image component we created before
import Image from "../components/image";

const Test = () => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="w-1/4">
        <Image src={`YOURIMAGESRC`} width={300} height={300} />
      </div>
    </main>
  );
};

export default Test;
```

<img
  alt='use component on all images'
  src='https://res.cloudinary.com/dlpb6j88q/image/upload/v1652331620/jagad.dev/posts/custom-image-transition-in-nextjs-with-tailwind-css/use_components_in_all_images_lrnl5h.gif'
  width='600'
  height='319'
/>

# Create a Rick and Morty Character List With a Custom Image

To apply to the project, we only need to import the components that were created earlier.

For example, we will implement the Rick and Morty API.

```javascript
import Image from "../components/image";

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character/");
  const content = await res.json();

  return {
    props: {
      content,
    },
  };
}

const Home = ({ content }) => {
  return (
    <div className="bg-gray-200 p-5 sm:p-16 lg:p-32">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-5">
        {content.results.map((character) => {
          const { id, name, image, status, type, gender } = character;

          return (
            <div key={id} className="rounded-lg bg-white">
              <div className="overflow-hidden rounded-t-lg">
                <Image
                  src={image}
                  width={300}
                  height={300}
                  layout="responsive"
                />
              </div>
              <div className="mx-4 my-4">
                <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                <p className="text-md text-gray-600">Status : {status}</p>
                <p className="text-md text-gray-600">Gender : {gender}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
```

Here is the result of the implementation of the Rick and Morty Character List with a Custom Image.

<img
  alt='implementation of the Rick and Morty Character List'
  src='https://res.cloudinary.com/dlpb6j88q/image/upload/v1652332661/jagad.dev/posts/custom-image-transition-in-nextjs-with-tailwind-css/implementation_of_the_Rick_and_Morty_Character_List_rwb1sw.gif'
  width='600'
  height='319'
/>

# Conclusion

Tailwind CSS can be used to provide a transition effect to custom images, making them more interactive.
