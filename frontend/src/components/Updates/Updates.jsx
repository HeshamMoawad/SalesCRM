import React from "react";
import { getDate } from "../../utils/time";
import './Updates.css';

const Updates = ({customer}) => {
    return (
        <>
            <div className="updates">
                <label className="header">Updates : {customer?.updates?.length}</label>
                {customer?.updates
                    ? customer.updates.map((update) => {
                          return (
                              <div className="update">
                                  <label htmlFor="name">
                                      Updated by: {update.user?.username}{" "}
                                  </label>
                                  <label htmlFor="by">
                                      Updated at : {getDate(update.created_at)}
                                  </label>
                              </div>
                          );
                      })
                    : null}
            </div>
        </>
    );
};

export default Updates;
