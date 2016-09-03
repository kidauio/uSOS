package layout;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import ec.com.tas.evaluacionfinal.R;

/*
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link organizacion.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link organizacion#newInstance} factory method to
 * create an instance of this fragment.
 */
public class organizacion extends Fragment {

    public organizacion() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_organizacion, container, false);
    }
}
