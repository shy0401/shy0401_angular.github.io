import { BehaviorSubject } from 'rxjs';

const wishlistSubject = new BehaviorSubject([]);

const WishlistService = {
  wishlist$: wishlistSubject.asObservable(),
  toggleWishlist: (movie) => {
    const currentWishlist = wishlistSubject.getValue();
    const movieIndex = currentWishlist.findIndex((item) => item.id === movie.id);

    if (movieIndex === -1) {
      wishlistSubject.next([...currentWishlist, movie]);
    } else {
      wishlistSubject.next(currentWishlist.filter((item) => item.id !== movie.id));
    }
  },
};

export default WishlistService;
