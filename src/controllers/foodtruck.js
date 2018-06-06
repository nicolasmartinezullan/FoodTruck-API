import mongoose from 'mongoose';
import { Router } from 'express';

import { authenticate } from '../middleware/authMiddleware';
import FoodTruck from '../models/foodtruck';
import Review from '../models/review';

export default ({ config, db }) => {
  const api = Router();

  // CRUD - Create Read Update Delete

  // POST '/v1/foodtrucks' - Create
  api.post('/', (req, res) => {
    const newFoodtruck = new FoodTruck();

    copyOwnProperties(req.body, newFoodtruck);

    newFoodtruck.save(err => {
      if (err) {
        res.send(err);
        return;
      }
      res.json({ message: 'Foodtruck saved successfully' });
    });
  });

  // GET '/v1/foodtrucks' - Read
  api.get('/', authenticate, (req, res) => {
    FoodTruck.find({}, (err, foodtrucks) => {
      if (err) {
        res.send(err);
        return;
      }
      res.json(foodtrucks);
    });
  });

  // GET '/v1/foodtrucks/:id' - Read 1
  api.get('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
        return;
      }
      res.json(foodtruck);
    });
  });

  // PUT '/v1/foodtrucks/:id' - Update 1
  api.put('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
        return;
      }

      foodtruck.name = req.body.name;

      foodtruck.save(err => {
        if (err) {
          res.send(err);
          return;
        }
        res.json({ message: 'Foodtruck info updated' });
      });
    });
  });

  // DELETE '/v1/foodtrucks/:id' - Delete 1
  api.delete('/:id', (req, res) => {
    FoodTruck.remove({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
        return;
      }
      res.json({ message: 'Foodtruck deleted successfully' });
    });
  });

  // POST '/v1/foodtrucks/:id/reviews' - Post
  api.post('/:id/reviews', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err) {
        res.send(err);
        return;
      }

      const newReview = new Review();

      copyOwnProperties(req.body, newReview);
      newReview.foodtruck = foodtruck._id;

      newReview.save(err => {
        if (err) {
          res.send(err);
          return;
        }

        foodtruck.reviews.push(newReview);
        foodtruck.save(err => {
          if (err) {
            res.send(err);
            return;
          }
          res.json({ message: 'Review created successfully' });
        });
      });
    });
  });

  // GET '/v1/foodtrucks/:id/reviews'
  api.get('/:id/reviews', (req, res) => {
    Review.find({ foodtruck: req.params.id }, (err, reviews) => {
      if (err) {
        res.send(err);
        return;
      }
      res.json(reviews);
    });
  });

  return api;
};

function copyOwnProperties(from, to) {
  for (let prop of Object.keys(from)) {
    if (from.hasOwnProperty(prop)) {
      to[prop] = from[prop];
    }
  }
}
