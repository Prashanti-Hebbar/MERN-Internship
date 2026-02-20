import React from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import img1 from '/img1.webp';
import img2 from '/img2.webp';
import img3 from '/img3.webp';
import img4 from '/img4.png';

export default function MuiCard() {

  const languageData = [
    {
      title: 'JavaScript',
      description:
        'JavaScript is a versatile scripting language used to build interactive web applications. It works on both frontend and backend using Node.js.',
      image: img1,
    },
    {
      title: 'Python',
      description:
        'Python is a powerful and easy-to-learn programming language widely used in data science, machine learning, automation, and web development.',
      image: img2,
    },
    {
      title: 'Java',
      description:
        'Java is a robust, object-oriented programming language commonly used for enterprise applications, Android development, and backend systems.',
      image: img3,
    },
    {
      title: 'C++',
      description:
        'C++ is a high-performance programming language used in system programming, game development, and competitive coding.',
      image: img4,
    },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {languageData.map((lang, index) => (
        <Card key={index} sx={{ maxWidth: 500, m: 5 }}>
          <CardMedia
            component="img"
            height="500"
            image={lang.image}
            alt={lang.title}
          />

          <CardContent>
            <Typography gutterBottom variant="h4">
              <b>{lang.title}</b>
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {lang.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}