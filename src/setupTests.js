/* eslint-disable */

import '@testing-library/jest-dom';

import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

import 'jest-canvas-mock';
