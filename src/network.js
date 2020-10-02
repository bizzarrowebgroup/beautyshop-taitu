import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

export const db = firebase.firestore();
export const dbVal = firebase.firestore;