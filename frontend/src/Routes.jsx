import React, { useEffect } from "react";
import {useNavigate, useRoutes} from 'react-router-dom'

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";


import { useAuth } from "./authContext";

