import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  ACTIVITY_FEED_ROUTE,
  ARCHIVED_LIST_ROUTE,
  DETAILS_ROUTE,
} from "../utils/consts";
import { ActivityFeedPage } from "../pages/ActivityFeedPage";
import { ArchivedListPage } from "../pages/ArchivedListPage";
import { DetailsPage } from "../pages/DetailsPage";

const AppRouter = () => {
  return (
    <Switch>
      <Route path={ACTIVITY_FEED_ROUTE} component={ActivityFeedPage} exact />
      <Route path={ARCHIVED_LIST_ROUTE} component={ArchivedListPage} exact />
      <Route path={DETAILS_ROUTE + ":id"} component={DetailsPage} />
      <Redirect to={ACTIVITY_FEED_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
